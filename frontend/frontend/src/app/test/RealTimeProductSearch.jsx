"use client";
import React, {useState} from 'react';
import axios from 'axios';

const page = (prop) => {
    const search = prop;
    let output;
    const loadData = async () => {
        const options = {
            method: 'GET',
            url: 'https://real-time-product-search.p.rapidapi.com/search',
            params: {
              q: search,
              country: 'us',
              language: 'en'
            },
            headers: {
              'X-RapidAPI-Key': 'da599125e6msha45a2c18c882723p12f1f7jsn3935ec860280',
              'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              const priceArray = [];
              response.data.data.map((item) => {
                if (item.typical_price_range !== null) {
                  for (let data of item.typical_price_range) {
                    let dataArray = data.split("");
                    for (let item of dataArray) {
                      if (item === "$" || item === ",") {
                        let index = dataArray.indexOf(item)
                        if (index > -1) {
                          dataArray.splice(index, 1)
                        }
                      } else if (item === ".") {
                        let index = dataArray.indexOf(item)
                        if (index > -1) {
                          dataArray.splice(index, 5);
                        }
                      }

                    }
                    let newData = dataArray.join("");
                    priceArray.push(Number(newData));
                  }
                }
              })
              let total = 0;
                    for (let item of priceArray) {
                      total += item
                    }
                    output =  total / priceArray.length
                    console.log(output);
          } catch (error) {
              console.error(error);
          }
    }
    loadData();
    
    return (
      <div></div>
    )
}

export default page;