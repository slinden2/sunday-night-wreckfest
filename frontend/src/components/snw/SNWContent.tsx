/* 
SNW page content
*/

import React from "react";
import { Page, HeaderH3 } from "../styledElements";

const SNWContent = () => {
  return (
    <Page>
      <HeaderH3>Mikä on SNW?</HeaderH3>
      <p>
        Sunday Night Wreckfest on yksi nimikkopelinsä vanhimmista suomalaisista
        kilpailuyhteisöistä, joka koostuu eri tasoisista kuljettajista, joilla
        on taustaa eri autopeleistä tai oikean elämän autoilusta. Wreckfestin
        ryppyiset, ruosteiset ruoskat ja simcade -fysiikat tarjoavat erilaista
        ajotoimintaa muihin markkinoilla oleviin ajeluihin verrattuna, ja siksi
        yleensä kilpailuidemme teemana on sovellettu jokamiesluokka.
      </p>
      <p>
        Virallinen kausi on kaikista kilpamuodoistamme kruununjalokivi, joka
        tukee 36 osallistujaa. Kovan tason kilpakaudessa riittää treeniseuraa,
        keskustelua autojen säädöistä tai radan ominaisuuksista sekä hampaat
        irvessä -hetkiä sijoista taistellen 9 kisapäivän ajan! Jos
        vakavamielinen kisailu ei maistu, niin tarjolla on monia muita
        kilpamuotoja, esim tila-autojen oma kamppailu nimeltä Perhehelvetti.
        Kilpailut ovat aina sunnuntai-iltaisin, jotta mahdollisimman monella
        olisi tsäänssi päästä nauttimaan korkeaoktaanisesta toiminnasta sekä
        läpän heitosta yhteisön jäsenten kanssa!
      </p>
      <p>
        <strong>Tervetuloa yhteisöömme!</strong>
      </p>
    </Page>
  );
};

export default SNWContent;
