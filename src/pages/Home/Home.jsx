import { useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { Main } from "../../components/Main/Main";

import './home.css'

export default function Home() {

  const [valueSearch , setValueSearch] = useState('');

  return (
    <div className="container">
      <Header setValueSearch={setValueSearch}/>
      <Main valueSearch={valueSearch}/>
      <Footer />
    </div>
  );
}

