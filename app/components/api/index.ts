import axios from "axios";

const instance = axios.create({
  /* ниже данные с ограниченным запросов, но с точками и миллионы раскомментировать ниже и закомментировать => "baseURL: "https://run.mocky.io/v3/"
    работает совместо с данными из файла components/gistogramm/gist, там нужно раскомментировать и закомментировать аналогичным образом.
  */
  // baseURL: "https://dataset.free.beeceptor.com/",
  /* ниже данные без точек, без ограничения по запросам */
  baseURL: "https://run.mocky.io/v3/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
