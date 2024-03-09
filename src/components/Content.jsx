/*
function Content() {
  return (
    <div style={{textAlign: "center"}}>メインコンテンツ</div>
  )
}

export default Content
*/

import { Grid } from '@mui/material'
import React from 'react'
import BodyCard from './BodyCard'
import { useEffect,useState } from "react";

async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
  }

function Content() {
    const [imageAkita, setImageAkita] = useState([]);
    const [imageBeagle, setImageBeagle] = useState([]);
    const [imageDachshund, setImageDachshund] = useState([]);
    const [imageDalmatian, setImageDalmatian] = useState([]);
    const [imageHusky, setImageHusky] = useState([]);
    const [imageKomondor, setImageKomondor] = useState([]);
    const [imageToyPoodle, setImageToyPoodle] = useState([]);
    const [imageShiba, setImageShiba] = useState([]);
    const [imageYorkshireTerrier, setImageYorkshireTerrier] = useState([]);
    const [imageRandom, setImageRandom] = useState([]);

    const [textAkita, setTextAkita] = useState([]);
    const [textBeagle, setTextBeagle] = useState([]);
    const [textDachshund, setTextDachshund] = useState([]);
    const [textDalmatian, setTextDalmatian] = useState([]);
    const [textHusky, setTextHusky] = useState([]);
    const [textKomondor, setTextKomondor] = useState([]);
    const [textToyPoodle, setTextToyPoodle] = useState([]);
    const [textShiba, setTextShiba] = useState([]);
    const [textYorkshireTerrier, setTextYorkshireTerrier] = useState([]);
    const [textRandom, setTextRandom] = useState([]);
    

    useEffect (() => {
      (async () => { 
        setImageAkita(await fetchData(`https://dog.ceo/api/breed/akita/images/random`));
        setImageBeagle(await fetchData(`https://dog.ceo/api/breed/beagle/images/random`));
        setImageDachshund(await fetchData(`https://dog.ceo/api/breed/dachshund/images/random`));
        setImageDalmatian(await fetchData(`https://dog.ceo/api/breed/dalmatian/images/random`));
        setImageHusky(await fetchData(`https://dog.ceo/api/breed/husky/images/random`));
        setImageKomondor(await fetchData(`https://dog.ceo/api/breed/komondor/images/random`));
        setImageToyPoodle(await fetchData(`https://dog.ceo/api/breed/poodle/toy/images/random`));
        setImageShiba(await fetchData(`https://dog.ceo/api/breed/shiba/images/random`));
        setImageYorkshireTerrier(await fetchData(`https://dog.ceo/api/breed/terrier/yorkshire/images/random`));
        setImageRandom(await fetchData(`https://dog.ceo/api/breeds/image/random`));

        setTextAkita(await fetchData(`https://ja.wikipedia.org/api/rest_v1/page/summary/秋田犬`));
        setTextBeagle(await fetchData(`https://ja.wikipedia.org/api/rest_v1/page/summary/ビーグル`));
        setTextDachshund(await fetchData(`https://ja.wikipedia.org/api/rest_v1/page/summary/ダックスフント`));
        setTextDalmatian(await fetchData(`https://ja.wikipedia.org/api/rest_v1/page/summary/ダルメシアン`));
        setTextHusky(await fetchData(`https://ja.wikipedia.org/api/rest_v1/page/summary/シベリアン・ハスキー`));
        setTextKomondor(await fetchData(`https://ja.wikipedia.org/api/rest_v1/page/summary/コモンドール`));
        setTextToyPoodle(await fetchData(`https://ja.wikipedia.org/api/rest_v1/page/summary/プードル`));
        setTextShiba(await fetchData(`https://ja.wikipedia.org/api/rest_v1/page/summary/柴犬`));
        setTextYorkshireTerrier(await fetchData(`https://ja.wikipedia.org/api/rest_v1/page/summary/ヨークシャー・テリア`));
        setTextRandom(await fetchData(`https://ja.wikipedia.org/api/rest_v1/page/summary/イヌ`));

      })();
    },[]);

  const cardContents = [
    {
      title: "秋田犬",
      text: textAkita.extract,
      imageUrl: imageAkita.message,
      externalUrl: "https://ja.wikipedia.org/wiki/秋田犬"
    },
    {
      title: "ビーグル",
      text: textBeagle.extract,
      imageUrl: imageBeagle.message,
      externalUrl: "https://ja.wikipedia.org/wiki/ビーグル"
    },
    {
      title: "ダックスフント",
      text: textDachshund.extract,
      imageUrl: imageDachshund.message,
      externalUrl: "https://ja.wikipedia.org/wiki/ダックスフント"
    },
    {
      title: "ダルメシアン",
      text: textDalmatian.extract,
      imageUrl: imageDalmatian.message,
      externalUrl: "https://ja.wikipedia.org/wiki/ダルメシアン"
    },
    {
      title: "ハスキー",
      text: textHusky.extract,
      imageUrl: imageHusky.message,
      externalUrl: "https://ja.wikipedia.org/wiki/シベリアン・ハスキー"
    },
    {
      title: "コモンドール",
      text: textKomondor.extract,
      imageUrl: imageKomondor.message,
      externalUrl: "https://ja.wikipedia.org/wiki/コモンドール"
    },
    {
      title: "トイプードル",
      text: textToyPoodle.extract,
      imageUrl: imageToyPoodle.message,
      externalUrl: "https://ja.wikipedia.org/wiki/プードル"
    },
    {
      title: "柴犬",
      text: textShiba.extract,
      imageUrl: imageShiba.message,
      externalUrl: "https://ja.wikipedia.org/wiki/柴犬"
    },
    {
      title: "ヨークシャーテリア",
      text: textYorkshireTerrier.extract,
      imageUrl: imageYorkshireTerrier.message,
      externalUrl: "https://ja.wikipedia.org/wiki/ヨークシャー・テリア"
    },
    {
      title: "ランダム",
      text: textRandom.extract,
      imageUrl: imageRandom.message,
      externalUrl: "https://ja.wikipedia.org/wiki/イヌ"
  },
]
  
  const getCardContent = getObj => {
    return (
        <Grid item xs={12} sm={4}>
            <BodyCard {...getObj} />
        </Grid>
    );
  };
  return (
    <Grid container spacing={2}>
        {cardContents.map(contentObj => getCardContent(contentObj))}
    </Grid>
  )
}

export default Content