import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Box from '@mui/material/Box';
import { ImageList,ImageListItem } from '@mui/material';
import { useEffect,useState } from "react";
import Checkbox from '@mui/material/Checkbox';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import RefreshIcon from '@mui/icons-material/Refresh';

import Content from './Content';

const APIURL = "";

export default function DogCaptchaDialog() {
  const [open, setOpen] = useState(false);
 
  const handleClickOpen = () => {
    setOpen(true);
  };
 
  const handleClose = (forceNotToReload) => {
    setOpen(false);
    if (passFlag !== 1 && !forceNotToReload) handleReload();
  };

  const [dataArr, setDataArr] = useState([]);

  const [id, setId] = useState("");
  const [quiz, setQuiz] = useState("");
  const [quizJa, setQuizJa] = useState("");
  const [message, setMessage] = useState([]);
  const [ans, setAns] = useState([]);
  const [APIBusy, setAPIBusy] = useState(false);
  const [passFlag, setPassFlag] = useState(-1); //0: Failed, 1: Passed, -1: Initialized
  useEffect (() => {
    fetchDogCaptchaAPI();
  },[]);

  {/* POST */}
  //Fetch to DogCAPTCHA API
  async function fetchDogCaptchaAPI() {
    setId("0");
    setQuiz("");
    setQuizJa("ちょっと待ってね");
    setMessage([]);
    setAPIBusy(true);
    setPassFlag(-1);
    setAns([]);

    await fetch(APIURL + "/.netlify/functions/DogCaptcha", {
      method: 'POST',
      body: null,
      headers: { 'Content-Type': 'application/json' },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      setAPIBusy(false);
      setId(data.id);
      setQuiz(data.quiz);
      setQuizJa(data.quiz_ja);
      setMessage(data.message);
      return data;
    })
    .catch((error) => console.error('Error:', error));
  }

  useEffect (() => {
    setDataArr(message.map((message_list) => ({ message_list })));{/* dataListを配列にする */}
  },[message, setMessage]);

  const handleReload = async () => {
    if (!APIBusy) {
      await handleDeleteFromDatabase();
      fetchDogCaptchaAPI();
    }
  };

  {/* POST */}
  const handleSubmit = () => {
    if (!APIBusy) {
      if (passFlag === 1) {handleClose(false); return;}
      setPassFlag(-1);
      setAPIBusy(true);
      const data = { id: id, quiz: quiz, ans: ans };
      fetch(APIURL + '/.netlify/functions/DogCaptchaHandleAnswer', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        setAPIBusy(false);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
        })
      .then(data => {
        console.log(data);
        setPassFlag(data.passFlag);
        if (data.passFlag === 1) {
          handleClose(true);  //passFlagが1に更新されていないので、再読み込み禁止
        }
      })
      .catch((error) => console.error('Error:', error));
    }
  }

  {/* DELETE */}
  const handleDeleteFromDatabase = () => {
    if (!APIBusy) {
      setAPIBusy(true);
      const data = { id: id };
      fetch(APIURL + '/.netlify/functions/DogCaptchaHandleAnswer', {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      .then(response => {
        //setAPIBusy(false);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        return response.json();
        })
      .then(data => console.log(data))
      .catch((error) => console.error('Error:', error));
    }
  }

  return (
    <div>
      <br />
      <div style={{textAlign: "center"}}>
      {/* Dialog button */}
      <Button variant="outlined" color="inherit" onClick={handleClickOpen} startIcon={passFlag === 1 ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />} endIcon={<RotateRightIcon />}>
        <div style={{textAlign: "left"}}>私はロボットではあり<br />ません</div>
      </Button>
      </div>
      <br />
      
      {/* Main Content */}
      {/* <Button style={{textAlign: "center"}} disabled={passFlag !== 1} color="primary" size="large" variant="contained" onClick={() => alert("ダミー")}>送信(ダミー)</Button> */}
      {passFlag === 1 && <>
        <Content />
      </>}
      

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >  
        <DialogContent>

          {passFlag !== 1 && <>
          <Box
            sx={{p: 2,
            m: 1,
            color: 'primary.main',
            bgcolor: 'primary.light',
            }}
          >
            <p style={{color: "white"}}>
              <span style={{"fontSize": 30, fontWeight: "bold"}}>{quizJa}</span><br />{APIBusy && id === "0" ? "読み込み中です。" : "の画像をすべて選択してください。"}
            </p>
          </Box>
            
            {/* Standard image list */}
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
              {dataArr.map((jsondata, i) => (
                <Checkbox
                key={i}
                value={i}
                icon={
                  <ImageListItem key={jsondata.message_list}>
                    <img
                      srcSet={`${jsondata.message_list}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${jsondata.message_list}?w=164&h=164&fit=crop&auto=format`}
                    />
                  </ImageListItem>
                }
                checkedIcon={
                  <ImageListItem key={jsondata.message_list} sx={{border: 4}}>
                    <img
                      srcSet={`${jsondata.message_list}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${jsondata.message_list}?w=164&h=164&fit=crop&auto=format`}
                    />
                  </ImageListItem>
                }
                onChange={(event) => {
                  if (ans.includes(event.target.value)) {
                    setAns(
                      ans.filter((ans) => ans !== event.target.value)
                    );
                  } else {
                    setAns([...ans, event.target.value]);
                  }
                }}
                checked={ans.includes(String(i))}
                sx={{margin: 0, padding: 0, border: 0}}
                />
              ))
              }
            </ImageList>

          <p style={{color: "red"}}> {passFlag === 0 && "もう一度お試しください"} </p>
          {/*{id} | {quiz} | {quizJa} | {message}*/}
          </> }

          {passFlag === 1 && <div>わんわんCAPTCHAに正解しました。うれしーーーー<br />再挑戦するには再試行ボタンを押してください</div>}

        </DialogContent>
        <DialogActions>
          <div style={{color: "gray", flex: "0.975 0 0"}}>わんわんCAPTCHA </div>
          <Button disabled={APIBusy} color="inherit" size="large" variant="text" onClick={handleReload}><RefreshIcon /></Button>
          <Button disabled={APIBusy} color="primary" size="large" variant="contained" onClick={handleSubmit} autoFocus>{APIBusy ? "通信中" : "確認"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
