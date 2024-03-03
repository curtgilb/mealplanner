import { Prisma } from "@prisma/client";
import { db } from "../../src/db.js";
import cuid from "cuid";

export const ingredientGroups: Prisma.RecipeIngredientGroupCreateInput[] = [
  {
    id: "clt6irl0900054wv97g0e9w7v",
    name: "Marinade",
  },
  {
    id: "clt6irl0900064wv9e0rb6kp2",
    name: "Cucumber Salad",
  },
  {
    id: "clt6irl0a00074wv95kwkeih7",
    name: "Infused Oil",
  },
];

const nutritionLabels: Prisma.NutritionLabelCreateWithoutRecipeInput[] = [
  {
    name: "Chicken Gyro with Tzatziki Sauce (Marinade)",
    servings: 5,
    servingsUsed: 3,
    isPrimary: false,
    verifed: true,
    ingredientGroup: { connect: { id: "clt6irl0900054wv97g0e9w7v" } },
    nutrients: {
      createMany: {
        data: [
          { value: 335.1, nutrientId: "clt6dqtz90000awv9anfb343o" },
          { value: 1.17, nutrientId: "clt6dqtzb0002awv94szib334" },
          { value: 43.85, nutrientId: "clt6dqtzb0005awv91zm27dpi" },
          { value: 94.79, nutrientId: "clt6dqtzc0006awv99dw8ba6d" },
          { value: 0.07, nutrientId: "clt6dqtzk001eawv9getu2lnr" },
          { value: 0.14, nutrientId: "clt6dqtzl001fawv9diafbslc" },
          { value: 0.57, nutrientId: "clt6dqtzl001gawv98zhg5ti9" },
          { value: 0.32, nutrientId: "clt6dqtzl001hawv9av3j07d6" },
          { value: 0.23, nutrientId: "clt6dqtzl001iawv9gh36h7fx" },
          { value: 0.19, nutrientId: "clt6dqtzm001jawv9dby65jkr" },
          { value: 12.57, nutrientId: "clt6dqtzn001oawv96yx7eth2" },
          { value: 0.05, nutrientId: "clt6dqtzp001xawv9altmg2n5" },
          { value: 578.27, nutrientId: "clt6dqtzn001pawv919zkdvp0" },
          { value: 125.29, nutrientId: "clt6dqtzn001qawv9dc178tb0" },
          { value: 13.03, nutrientId: "clt6dqtzm001lawv96c9n5u1x" },
          { value: 0.05, nutrientId: "clt6dqtzp001yawv91yrw5oiq" },
          { value: 16.82, nutrientId: "clt6dqtzm001mawv92d0maqj3" },
          { value: 1.17, nutrientId: "clt6dqtzp001zawv9h7yp2e4t" },
          { value: 453.32, nutrientId: "clt6dqtzn001rawv9fxtp4ehl" },
          { value: 0.12, nutrientId: "clt6dqtzo001sawv94tsldefq" },
          { value: 12.73, nutrientId: "clt6dqtzo001tawv983ea08nk" },
          { value: 66.66, nutrientId: "clt6dqtzm001nawv940jw0v1l" },
          { value: 14.95, nutrientId: "clt6dqtzo001uawv93yzuepza" },
          { value: 1.74, nutrientId: "clt6dqtzo001vawv98fiuhklq" },
          { value: 5.2, nutrientId: "clt6dqtzp001wawv99wux8e0i" },
          { value: 37.92, nutrientId: "clt6dqtzq0020awv92t3v4527" },
          { value: 160.17, nutrientId: "clt6dqtzq0021awv920fwelf5" },
          { value: 0.1, nutrientId: "clt6dqtzq0024awv9eyvggop6" },
          { value: 0.08, nutrientId: "clt6dqtzr0026awv93hm8c40h" },
          { value: 3.31, nutrientId: "clt6dqtzr0027awv9c2iueqx0" },
          { value: 31.45, nutrientId: "clt6dqtzr0028awv911p11mq2" },
          { value: 0.48, nutrientId: "clt6dqtzr0029awv975g5bfea" },
          { value: 89.15, nutrientId: "clt6dqtzs002bawv95j7v1332" },
          { value: 282.38, nutrientId: "clt6dqtzs002cawv9bj5z9wqy" },
          { value: 3.05, nutrientId: "clt6dqtzs002dawv94al96ozt" },
          { value: 991.69, nutrientId: "clt6dqtzs002eawv94gped853" },
          { value: 0.61, nutrientId: "clt6dqtzt002fawv9eeo98yr1" },
          { value: 11.48, nutrientId: "clt6dqtzc0007awv9h1mv5pbi" },
          { value: 2.61, nutrientId: "clt6dqtzc0008awv91e2h8zwj" },
          { value: 0.54, nutrientId: "clt6dqtzd000cawv92yc45siv" },
          { value: 0.01, nutrientId: "clt6dqtzd000dawv94b7024wo" },
          { value: 0.44, nutrientId: "clt6dqtzd000eawv93a8g6f5q" },
          { value: 2.05, nutrientId: "clt6dqtzd000fawv94t8j76l4" },
          { value: 3.34, nutrientId: "clt6dqtzc0009awv97h7p9kym" },
          { value: 0.21, nutrientId: "clt6dqtze000hawv992ei0erp" },
          { value: 3.29, nutrientId: "clt6dqtzc000aawv9hrqg23gq" },
          { value: 0.02, nutrientId: "clt6dqtze000jawv9cc8gcxxx" },
          { value: 8.85, nutrientId: "clt6dqtze000kawv9hw4e6yuz" },
          { value: 30.39, nutrientId: "clt6dqtze000lawv9b3w34hxe" },
          { value: 9.23, nutrientId: "clt6dqtzg000sawv9hgoieof0" },
          { value: 20.75, nutrientId: "clt6dqtzf000mawv936gc7xsk" },
          { value: 3.21, nutrientId: "clt6dqtzf000nawv96and8b2m" },
          { value: 5.39, nutrientId: "clt6dqtzf000qawv95wy662jn" },
          { value: 0.13, nutrientId: "clt6dqtzf000rawv95mxg6och" },
          { value: 0.26, nutrientId: "clt6dqtzf000oawv95zv581pp" },
          { value: 2.93, nutrientId: "clt6dqtzf000pawv96oh164q5" },
          { value: 0.27, nutrientId: "clt6dqtzg000vawv9a09mfmrr" },
          { value: 0.26, nutrientId: "clt6dqtzg000wawv91uej01ep" },
          { value: 0.67, nutrientId: "clt6dqtzh000xawv93o8wcbdk" },
          { value: 0.1, nutrientId: "clt6dqtzh000yawv9gedha2zy" },
          { value: 1.19, nutrientId: "clt6dqtzh000zawv94nbce1c0" },
          { value: 0.17, nutrientId: "clt6dqtzh0010awv940az2y1a" },
          { value: 0.14, nutrientId: "clt6dqtzh0011awv9fibc5fop" },
          { value: 0.32, nutrientId: "clt6dqtzi0013awv97kqe3c94" },
          { value: 0.59, nutrientId: "clt6dqtzi0014awv9ccxs931h" },
          { value: 0.52, nutrientId: "clt6dqtzi0015awv90v3020y7" },
          { value: 0.14, nutrientId: "clt6dqtzj0016awv9f0u8fe56" },
          { value: 0.25, nutrientId: "clt6dqtzj0017awv92fwrajtd" },
          { value: 0.49, nutrientId: "clt6dqtzj0018awv9a77j05q3" },
          { value: 7.02, nutrientId: "clt6dqtzg000uawv918m4fxsm" },
          { value: 0.31, nutrientId: "clt6dqtzj0019awv94xnsc51k" },
          { value: 0.3, nutrientId: "clt6dqtzk001aawv9ax448o8h" },
          { value: 0.11, nutrientId: "clt6dqtzk001bawv9ci6u6uxm" },
          { value: 0.2, nutrientId: "clt6dqtzk001cawv9cu1wbyec" },
          { value: 0.35, nutrientId: "clt6dqtzk001dawv9df3rb5yv" },
        ],
      },
    },
  },
  {
    name: "Chicken Gyro with Tzatziki Sauce",
    servings: 6,
    isPrimary: true,
    verifed: true,
    nutrients: {
      createMany: {
        data: [
          { value: 2083.26, nutrientId: "clt6dqtz90000awv9anfb343o" },
          { value: 2.71, nutrientId: "clt6dqtzb0002awv94szib334" },
          { value: 4.19, nutrientId: "clt6dqtzb0005awv91zm27dpi" },
          { value: 239.44, nutrientId: "clt6dqtzc0006awv99dw8ba6d" },
          { value: 0.12, nutrientId: "clt6dqtzk001eawv9getu2lnr" },
          { value: 0.35, nutrientId: "clt6dqtzl001fawv9diafbslc" },
          { value: 0.25, nutrientId: "clt6dqtzl001gawv98zhg5ti9" },
          { value: 0.94, nutrientId: "clt6dqtzl001hawv9av3j07d6" },
          { value: 0.15, nutrientId: "clt6dqtzl001iawv9gh36h7fx" },
          { value: 0.81, nutrientId: "clt6dqtzm001jawv9dby65jkr" },
          { value: 7.78, nutrientId: "clt6dqtzn001oawv96yx7eth2" },
          { value: 110.03, nutrientId: "clt6dqtzn001pawv919zkdvp0" },
          { value: 17.5, nutrientId: "clt6dqtzn001qawv9dc178tb0" },
          { value: 33.87, nutrientId: "clt6dqtzm001lawv96c9n5u1x" },
          { value: 25.5, nutrientId: "clt6dqtzm001mawv92d0maqj3" },
          { value: 0.03, nutrientId: "clt6dqtzp001zawv9h7yp2e4t" },
          { value: 54.41, nutrientId: "clt6dqtzn001rawv9fxtp4ehl" },
          { value: 0.04, nutrientId: "clt6dqtzo001sawv94tsldefq" },
          { value: 100.69, nutrientId: "clt6dqtzo001tawv983ea08nk" },
          { value: 110.91, nutrientId: "clt6dqtzm001nawv940jw0v1l" },
          { value: 4.56, nutrientId: "clt6dqtzo001uawv93yzuepza" },
          { value: 74.73, nutrientId: "clt6dqtzo001vawv98fiuhklq" },
          { value: 0.42, nutrientId: "clt6dqtzp001wawv99wux8e0i" },
          { value: 8.98, nutrientId: "clt6dqtzq0020awv92t3v4527" },
          { value: 1152, nutrientId: "clt6dqtzq0021awv920fwelf5" },
          { value: 0.13, nutrientId: "clt6dqtzq0024awv9eyvggop6" },
          { value: 16.05, nutrientId: "clt6dqtzr0027awv9c2iueqx0" },
          { value: 32.72, nutrientId: "clt6dqtzr0028awv911p11mq2" },
          { value: 0.16, nutrientId: "clt6dqtzr0029awv975g5bfea" },
          { value: 180.77, nutrientId: "clt6dqtzs002bawv95j7v1332" },
          { value: 1723.34, nutrientId: "clt6dqtzs002cawv9bj5z9wqy" },
          { value: 6.89, nutrientId: "clt6dqtzs002dawv94al96ozt" },
          { value: 3457.06, nutrientId: "clt6dqtzs002eawv94gped853" },
          { value: 0.9, nutrientId: "clt6dqtzt002fawv9eeo98yr1" },
          { value: 240.35, nutrientId: "clt6dqtzc0007awv9h1mv5pbi" },
          { value: 37.24, nutrientId: "clt6dqtzc0008awv91e2h8zwj" },
          { value: 0.78, nutrientId: "clt6dqtzd000cawv92yc45siv" },
          { value: 0.66, nutrientId: "clt6dqtzd000eawv93a8g6f5q" },
          { value: 9.21, nutrientId: "clt6dqtzd000fawv94t8j76l4" },
          { value: 0.73, nutrientId: "clt6dqtzc0009awv97h7p9kym" },
          { value: 0.05, nutrientId: "clt6dqtze000hawv992ei0erp" },
          { value: 40.7, nutrientId: "clt6dqtzc000aawv9hrqg23gq" },
          { value: 30, nutrientId: "clt6dqtze000iawv9cl7ebk49" },
          { value: 0.11, nutrientId: "clt6dqtze000jawv9cc8gcxxx" },
          { value: 203, nutrientId: "clt6dqtze000kawv9hw4e6yuz" },
          { value: 54.82, nutrientId: "clt6dqtze000lawv9b3w34hxe" },
          { value: 562.1, nutrientId: "clt6dqtzg000sawv9hgoieof0" },
          { value: 3.04, nutrientId: "clt6dqtzf000mawv936gc7xsk" },
          { value: 0.53, nutrientId: "clt6dqtzf000nawv96and8b2m" },
          { value: 14.76, nutrientId: "clt6dqtzf000qawv95wy662jn" },
          { value: 0.4, nutrientId: "clt6dqtzf000rawv95mxg6och" },
          { value: 0.2, nutrientId: "clt6dqtzf000oawv95zv581pp" },
          { value: 0.22, nutrientId: "clt6dqtzf000pawv96oh164q5" },
          { value: 0.23, nutrientId: "clt6dqtzg000vawv9a09mfmrr" },
          { value: 0.22, nutrientId: "clt6dqtzg000wawv91uej01ep" },
          { value: 0.55, nutrientId: "clt6dqtzh000xawv93o8wcbdk" },
          { value: 0.05, nutrientId: "clt6dqtzh000yawv9gedha2zy" },
          { value: 1.53, nutrientId: "clt6dqtzh000zawv94nbce1c0" },
          { value: 0.15, nutrientId: "clt6dqtzh0010awv940az2y1a" },
          { value: 0.18, nutrientId: "clt6dqtzh0011awv9fibc5fop" },
          { value: 0.32, nutrientId: "clt6dqtzi0013awv97kqe3c94" },
          { value: 0.59, nutrientId: "clt6dqtzi0014awv9ccxs931h" },
          { value: 0.52, nutrientId: "clt6dqtzi0015awv90v3020y7" },
          { value: 0.17, nutrientId: "clt6dqtzj0016awv9f0u8fe56" },
          { value: 0.34, nutrientId: "clt6dqtzj0017awv92fwrajtd" },
          { value: 0.59, nutrientId: "clt6dqtzj0018awv9a77j05q3" },
          { value: 158.61, nutrientId: "clt6dqtzg000uawv918m4fxsm" },
          { value: 0.38, nutrientId: "clt6dqtzj0019awv94xnsc51k" },
          { value: 0.27, nutrientId: "clt6dqtzk001aawv9ax448o8h" },
          { value: 0.08, nutrientId: "clt6dqtzk001bawv9ci6u6uxm" },
          { value: 0.3, nutrientId: "clt6dqtzk001cawv9cu1wbyec" },
          { value: 0.4, nutrientId: "clt6dqtzk001dawv9df3rb5yv" },
        ],
      },
    },
  },
  {
    name: "Chicken Gyro with Tzatziki Sauce (Infused Oil)",
    ingredientGroup: { connect: { id: "clt6irl0a00074wv95kwkeih7" } },
    servings: 3,
    servingsUsed: 1,
    isPrimary: false,
    verifed: true,
    nutrients: {
      createMany: {
        data: [
          { value: 492.84, nutrientId: "clt6dqtz90000awv9anfb343o" },
          { value: 0.25, nutrientId: "clt6dqtzb0002awv94szib334" },
          { value: 13.83, nutrientId: "clt6dqtzb0005awv91zm27dpi" },
          { value: 3.73, nutrientId: "clt6dqtzc0006awv99dw8ba6d" },
          { value: 0.02, nutrientId: "clt6dqtzk001eawv9getu2lnr" },
          { value: 0.02, nutrientId: "clt6dqtzl001fawv9diafbslc" },
          { value: 0.1, nutrientId: "clt6dqtzl001gawv98zhg5ti9" },
          { value: 0.07, nutrientId: "clt6dqtzl001hawv9av3j07d6" },
          { value: 0.1, nutrientId: "clt6dqtzl001iawv9gh36h7fx" },
          { value: 0.21, nutrientId: "clt6dqtzn001oawv96yx7eth2" },
          { value: 0.06, nutrientId: "clt6dqtzp001xawv9altmg2n5" },
          { value: 31.33, nutrientId: "clt6dqtzn001pawv919zkdvp0" },
          { value: 0.1, nutrientId: "clt6dqtzn001qawv9dc178tb0" },
          { value: 2.56, nutrientId: "clt6dqtzm001lawv96c9n5u1x" },
          { value: 0.01, nutrientId: "clt6dqtzp001yawv91yrw5oiq" },
          { value: 5.94, nutrientId: "clt6dqtzm001mawv92d0maqj3" },
          { value: 0.7, nutrientId: "clt6dqtzp001zawv9h7yp2e4t" },
          { value: 51.32, nutrientId: "clt6dqtzn001rawv9fxtp4ehl" },
          { value: 0.02, nutrientId: "clt6dqtzo001sawv94tsldefq" },
          { value: 2.62, nutrientId: "clt6dqtzm001nawv940jw0v1l" },
          { value: 2.57, nutrientId: "clt6dqtzo001uawv93yzuepza" },
          { value: 8.12, nutrientId: "clt6dqtzp001wawv99wux8e0i" },
          { value: 38.99, nutrientId: "clt6dqtzq0020awv92t3v4527" },
          { value: 41.89, nutrientId: "clt6dqtzq0021awv920fwelf5" },
          { value: 0.03, nutrientId: "clt6dqtzq0024awv9eyvggop6" },
          { value: 0.03, nutrientId: "clt6dqtzr0025awv98itw90lx" },
          { value: 0.16, nutrientId: "clt6dqtzr0026awv93hm8c40h" },
          { value: 1.1, nutrientId: "clt6dqtzr0027awv9c2iueqx0" },
          { value: 6.79, nutrientId: "clt6dqtzr0028awv911p11mq2" },
          { value: 0.18, nutrientId: "clt6dqtzr0029awv975g5bfea" },
          { value: 11.59, nutrientId: "clt6dqtzs002bawv95j7v1332" },
          { value: 49.03, nutrientId: "clt6dqtzs002cawv9bj5z9wqy" },
          { value: 0.95, nutrientId: "clt6dqtzs002dawv94al96ozt" },
          { value: 11342.73, nutrientId: "clt6dqtzs002eawv94gped853" },
          { value: 0.13, nutrientId: "clt6dqtzt002fawv9eeo98yr1" },
          { value: 3.44, nutrientId: "clt6dqtzc0007awv9h1mv5pbi" },
          { value: 1.04, nutrientId: "clt6dqtzc0008awv91e2h8zwj" },
          { value: 0.03, nutrientId: "clt6dqtzd000cawv92yc45siv" },
          { value: 0.03, nutrientId: "clt6dqtzd000eawv93a8g6f5q" },
          { value: 1.77, nutrientId: "clt6dqtzc0009awv97h7p9kym" },
          { value: 0.03, nutrientId: "clt6dqtze000hawv992ei0erp" },
          { value: 0.1, nutrientId: "clt6dqtzc000aawv9hrqg23gq" },
          { value: 2.4, nutrientId: "clt6dqtze000kawv9hw4e6yuz" },
          { value: 54.24, nutrientId: "clt6dqtze000lawv9b3w34hxe" },
          { value: 39.44, nutrientId: "clt6dqtzf000mawv936gc7xsk" },
          { value: 5.74, nutrientId: "clt6dqtzf000nawv96and8b2m" },
          { value: 7.56, nutrientId: "clt6dqtzf000qawv95wy662jn" },
          { value: 0.43, nutrientId: "clt6dqtzf000oawv95zv581pp" },
          { value: 5.31, nutrientId: "clt6dqtzf000pawv96oh164q5" },
          { value: 119.43, nutrientId: "clt6dqtzg000tawv9f6a66mqw" },
          { value: 0.02, nutrientId: "clt6dqtzg000vawv9a09mfmrr" },
          { value: 0.05, nutrientId: "clt6dqtzg000wawv91uej01ep" },
          { value: 0.05, nutrientId: "clt6dqtzh000xawv93o8wcbdk" },
          { value: 0.01, nutrientId: "clt6dqtzh000yawv9gedha2zy" },
          { value: 0.07, nutrientId: "clt6dqtzh000zawv94nbce1c0" },
          { value: 0.02, nutrientId: "clt6dqtzh0010awv940az2y1a" },
          { value: 0.01, nutrientId: "clt6dqtzh0011awv9fibc5fop" },
          { value: 0.02, nutrientId: "clt6dqtzi0013awv97kqe3c94" },
          { value: 0.03, nutrientId: "clt6dqtzi0014awv9ccxs931h" },
          { value: 0.02, nutrientId: "clt6dqtzi0015awv90v3020y7" },
          { value: 0.01, nutrientId: "clt6dqtzj0016awv9f0u8fe56" },
          { value: 0.02, nutrientId: "clt6dqtzj0017awv92fwrajtd" },
          { value: 0.03, nutrientId: "clt6dqtzj0018awv9a77j05q3" },
          { value: 0.54, nutrientId: "clt6dqtzg000uawv918m4fxsm" },
          { value: 0.02, nutrientId: "clt6dqtzj0019awv94xnsc51k" },
          { value: 0.02, nutrientId: "clt6dqtzk001aawv9ax448o8h" },
          { value: 0.01, nutrientId: "clt6dqtzk001bawv9ci6u6uxm" },
          { value: 0.01, nutrientId: "clt6dqtzk001cawv9cu1wbyec" },
          { value: 0.03, nutrientId: "clt6dqtzk001dawv9df3rb5yv" },
        ],
      },
    },
  },
  {
    name: "Chicken Gyro with Tzatziki Sauce (Cucumber Salad)",
    ingredientGroup: { connect: { id: "clt6irl0900064wv9e0rb6kp2" } },
    isPrimary: false,
    verifed: true,
    nutrients: {
      createMany: {
        data: [
          { value: 98.07, nutrientId: "clt6dqtz90000awv9anfb343o" },
          { value: 2.16, nutrientId: "clt6dqtzb0002awv94szib334" },
          { value: 15.27, nutrientId: "clt6dqtzb0005awv91zm27dpi" },
          { value: 447.35, nutrientId: "clt6dqtzc0006awv99dw8ba6d" },
          { value: 0.18, nutrientId: "clt6dqtzk001eawv9getu2lnr" },
          { value: 0.12, nutrientId: "clt6dqtzl001fawv9diafbslc" },
          { value: 1.21, nutrientId: "clt6dqtzl001gawv98zhg5ti9" },
          { value: 0.81, nutrientId: "clt6dqtzl001hawv9av3j07d6" },
          { value: 0.36, nutrientId: "clt6dqtzl001iawv9gh36h7fx" },
          { value: 152.5, nutrientId: "clt6dqtzn001oawv96yx7eth2" },
          { value: 0.01, nutrientId: "clt6dqtzp001xawv9altmg2n5" },
          { value: 1429.47, nutrientId: "clt6dqtzn001pawv919zkdvp0" },
          { value: 36.32, nutrientId: "clt6dqtzn001qawv9dc178tb0" },
          { value: 0.95, nutrientId: "clt6dqtzm001kawv915sw4pdj" },
          { value: 29.2, nutrientId: "clt6dqtzm001lawv96c9n5u1x" },
          { value: 92.19, nutrientId: "clt6dqtzm001mawv92d0maqj3" },
          { value: 0.32, nutrientId: "clt6dqtzp001zawv9h7yp2e4t" },
          { value: 1039.4, nutrientId: "clt6dqtzn001rawv9fxtp4ehl" },
          { value: 3473.67, nutrientId: "clt6dqtzo001sawv94tsldefq" },
          { value: 126.99, nutrientId: "clt6dqtzm001nawv940jw0v1l" },
          { value: 53.09, nutrientId: "clt6dqtzo001uawv93yzuepza" },
          { value: 0.93, nutrientId: "clt6dqtzp001wawv99wux8e0i" },
          { value: 263.28, nutrientId: "clt6dqtzq0020awv92t3v4527" },
          { value: 91.08, nutrientId: "clt6dqtzq0021awv920fwelf5" },
          { value: 0.3, nutrientId: "clt6dqtzq0024awv9eyvggop6" },
          { value: 0.2, nutrientId: "clt6dqtzr0025awv98itw90lx" },
          { value: 2.05, nutrientId: "clt6dqtzr0026awv93hm8c40h" },
          { value: 2.09, nutrientId: "clt6dqtzr0027awv9c2iueqx0" },
          { value: 59.05, nutrientId: "clt6dqtzr0028awv911p11mq2" },
          { value: 0.55, nutrientId: "clt6dqtzr0029awv975g5bfea" },
          { value: 117.31, nutrientId: "clt6dqtzs002bawv95j7v1332" },
          { value: 850.47, nutrientId: "clt6dqtzs002cawv9bj5z9wqy" },
          { value: 0.79, nutrientId: "clt6dqtzs002dawv94al96ozt" },
          { value: 504.88, nutrientId: "clt6dqtzs002eawv94gped853" },
          { value: 0.93, nutrientId: "clt6dqtzt002fawv9eeo98yr1" },
          { value: 21.22, nutrientId: "clt6dqtzc0007awv9h1mv5pbi" },
          { value: 5.27, nutrientId: "clt6dqtzc0008awv91e2h8zwj" },
          { value: 4.82, nutrientId: "clt6dqtzd000cawv92yc45siv" },
          { value: 0.01, nutrientId: "clt6dqtzd000dawv94b7024wo" },
          { value: 5.14, nutrientId: "clt6dqtzd000eawv93a8g6f5q" },
          { value: 0.44, nutrientId: "clt6dqtzc0009awv97h7p9kym" },
          { value: 1.12, nutrientId: "clt6dqtze000hawv992ei0erp" },
          { value: 11.12, nutrientId: "clt6dqtzc000aawv9hrqg23gq" },
          { value: 0.41, nutrientId: "clt6dqtze000jawv9cc8gcxxx" },
          { value: 15.55, nutrientId: "clt6dqtze000kawv9hw4e6yuz" },
          { value: 0.84, nutrientId: "clt6dqtze000lawv9b3w34hxe" },
          { value: 0.12, nutrientId: "clt6dqtzf000mawv936gc7xsk" },
          { value: 0.19, nutrientId: "clt6dqtzf000nawv96and8b2m" },
          { value: 0.27, nutrientId: "clt6dqtzf000qawv95wy662jn" },
          { value: 0.03, nutrientId: "clt6dqtzf000oawv95zv581pp" },
          { value: 0.02, nutrientId: "clt6dqtzf000pawv96oh164q5" },
          { value: 0.53, nutrientId: "clt6dqtzg000tawv9f6a66mqw" },
          { value: 0.15, nutrientId: "clt6dqtzg000vawv9a09mfmrr" },
          { value: 0.23, nutrientId: "clt6dqtzg000wawv91uej01ep" },
          { value: 0.41, nutrientId: "clt6dqtzh000xawv93o8wcbdk" },
          { value: 0.03, nutrientId: "clt6dqtzh000yawv9gedha2zy" },
          { value: 1.32, nutrientId: "clt6dqtzh000zawv94nbce1c0" },
          { value: 0.13, nutrientId: "clt6dqtzh0010awv940az2y1a" },
          { value: 0.05, nutrientId: "clt6dqtzh0011awv9fibc5fop" },
          { value: 0.08, nutrientId: "clt6dqtzi0013awv97kqe3c94" },
          { value: 0.15, nutrientId: "clt6dqtzi0014awv9ccxs931h" },
          { value: 0.16, nutrientId: "clt6dqtzi0015awv90v3020y7" },
          { value: 0.04, nutrientId: "clt6dqtzj0016awv9f0u8fe56" },
          { value: 0.15, nutrientId: "clt6dqtzj0017awv92fwrajtd" },
          { value: 0.1, nutrientId: "clt6dqtzj0018awv9a77j05q3" },
          { value: 4.1, nutrientId: "clt6dqtzg000uawv918m4fxsm" },
          { value: 0.13, nutrientId: "clt6dqtzj0019awv94xnsc51k" },
          { value: 0.1, nutrientId: "clt6dqtzk001aawv9ax448o8h" },
          { value: 0.04, nutrientId: "clt6dqtzk001bawv9ci6u6uxm" },
          { value: 0.05, nutrientId: "clt6dqtzk001cawv9cu1wbyec" },
          { value: 0.1, nutrientId: "clt6dqtzk001dawv9df3rb5yv" },
        ],
      },
    },
  },
];

export const recipe: Prisma.RecipeCreateInput = {
  title: "Chicken Gyro with Tzatziki Sauce",
  source: "https://howtofeedaloon.com/chicken-gyro-with-tzatziki-sauce/",
  preparationTime: 20,
  cookingTime: 35,
  marinadeTime: 60,
  totalTime: 115,
  directions: `MARINATE THE CHICKEN
  Lightly season the chicken pieces all over with salt and pepper.
  In a small bowl, whisk together the yogurt, garlic, vinegar, lemon juice, oil, salt, pepper, and seasonings until fully combined.
  Place the chicken in a large bowl and pour the marinade all over. Use wooden spoons to stir the chicken around until fully coated with the marinade. Either cover with plastic wrap, or transfer to a large freezer bag, seal, and place in the refrigerator for 1 to 8 hours. 
  
  MAKE THE CUCUMBER SALAD
  Place the cucumber, tomatoes, onion, parsley, vinegar, salt, and pepper in a medium-sized bowl. Gently mix. Set aside. 
  
  MAKE THE INFUSED OIL
  Heat the olive oil in a small skillet over medium heat. Once hot, add the minced garlic, herbs, salt, and pepper. Gently simmer for 3 to 5 minutes. Remove from heat and set aside. 
  
  COOK THE CHICKEN AND ASSEMBLE THE GYROS
  Heat grill to medium-high heat. Add chicken to grill and cook until fully cooked (about 15 minutes). Discard left-over marinade.
  Bring the chicken inside and let sit for a couple of minutes. Meanwhile, turn your broiler on LOW. Place the pitas on a baking sheet lined with aluminum foil and brush the tops with the infused oil. Place in the oven, on the middle rack, until the pitas are warmed through, a couple of minutes. Keep an eye on them, don't let them burn!
  Meanwhile, cut the chicken into strips and brush the infused oil all over the chicken.
  Remove the warmed pitas from the oven. Build the gyros by adding about 1 tbsp of the tzatziki sauce first, then a layer of chicken, topped with about a ¼ cup of cucumber topping, and then a little more tzatziki on top, if desired.
  Fold up like the sides like a soft taco, wrap the ends with a square of aluminum foil, and serve immediately.`,
  notes: `Boneless, skinless chicken thighs work well for this recipe, but you could also go with thin chicken breasts.  Just make sure they are cooked through until juices run clear and internal temperature reaches 165°F. 
  We love using whole milk Greek plain yogurt, but you could certainly use low-fat, or fat-free, but the marinade won't adhere to the chicken as well. 
  The infused oil is optional, but it's really easy to make and makes a big difference in the final taste of the gyros. 
  The tzatziki sauce, marinade, cucumber salad, and infused oil can all be made up to 12 hours before grilling the chicken.  Don't let the chicken sit in the marinade for more than 8 to 10 hours.
  This recipe can easily be doubled or tripled for serving a crowd.  
  The tzatziki sauce will keep in the fridge for up to 2 weeks, the cooked chicken and cucumber salad will keep for several days.`,
  isFavorite: true,
  isVerified: true,
  nutritionLabel: {
    create: nutritionLabels,
  },
  ingredients: {
    createMany: {
      data: [
        {
          sentence: "1¼ lbs chicken thighs boneless, skinless",
          quantity: 1.25,
          name: "chicken thighs",
          order: 1,
          measurementUnitId: "clt6gfaie000a8gv93iprake6",
          ingredientId: "clt6dchcn001if4v90pqm5cgs",
        },
        {
          sentence: "½ tsp Kosher salt plus more for seasoning chicken",
          quantity: 0.5,
          name: "kosher salt",
          order: 2,
          measurementUnitId: "clt6gfaic00018gv97hstbg6h",
          ingredientId: "clt6irl0700004wv95x8ygszy",
          groupId: "clt6irl0900054wv97g0e9w7v",
        },
        {
          sentence: "¼ tsp black pepper freshly ground",
          quantity: 0.25,
          name: "black pepper",
          order: 3,
          measurementUnitId: "clt6gfaic00018gv97hstbg6h",
          ingredientId: "clt6dchcg000qf4v9hw6k0of0",
          groupId: "clt6irl0900054wv97g0e9w7v",
        },
        {
          sentence: "¼ cup Greek yogurt plain, preferably whole milk",
          quantity: 0.25,
          name: "greek yogurt",
          order: 4,
          measurementUnitId: "clt6gfaic00028gv95ja6drhq",
          ingredientId: "clt6irl0800014wv95we7ba8b",
          groupId: "clt6irl0900054wv97g0e9w7v",
        },
        {
          sentence: "3 cloves garlic minced",
          quantity: 3,
          name: "garlic",
          order: 5,
          measurementUnitId: "clt6gfaig000m8gv96xxg76hk",
          ingredientId: "clt6dchcx002lf4v9hi6xfpaf",
          groupId: "clt6irl0900054wv97g0e9w7v",
        },
        {
          sentence: "2 tbsp lemon juice 1 lemon",
          quantity: 2,
          name: "lemon juice",
          order: 6,
          measurementUnitId: "clt6gfaib00008gv9fdsyfmgc",
          ingredientId: "clt6irl0800024wv98vrmhghq",
          groupId: "clt6irl0900054wv97g0e9w7v",
        },
        {
          sentence: "2 tsp red wine vinegar",
          quantity: 2,
          name: "red wine vinegar",
          order: 7,
          measurementUnitId: "clt6gfaic00018gv97hstbg6h",
          ingredientId: "clt6deiec002ey8v9bda855t4",
          groupId: "clt6irl0900054wv97g0e9w7v",
        },
        {
          sentence: "2 tbsp extra virgin olive oil",
          quantity: 2,
          name: "olive oil",
          order: 8,
          measurementUnitId: "clt6gfaib00008gv9fdsyfmgc",
          ingredientId: "clt6deie20019y8v90bin2nam",
          groupId: "clt6irl0900054wv97g0e9w7v",
        },
        {
          sentence: "1 tsp smoked paprika",
          quantity: 1,
          name: "smoked paprika",
          order: 9,
          measurementUnitId: "clt6gfaic00018gv97hstbg6h",
          ingredientId: "clt6irl0900034wv9atw01jx2",
          groupId: "clt6irl0900054wv97g0e9w7v",
        },
        {
          sentence: "1 tsp coriander ground",
          quantity: 1,
          name: "coriander",
          order: 10,
          measurementUnitId: "clt6gfaic00018gv97hstbg6h",
          ingredientId: "clt6dchcr001xf4v95ih5cni9",
          groupId: "clt6irl0900054wv97g0e9w7v",
        },
        {
          sentence: "1 tbsp dried oregano",
          quantity: 1,
          name: "oregano",
          order: 11,
          measurementUnitId: "clt6gfaib00008gv9fdsyfmgc",
          ingredientId: "clt6deie3001dy8v94gdyd6bn",
          groupId: "clt6irl0900054wv97g0e9w7v",
        },
        // End Group 1
        {
          sentence: "1 cucumber peeled, seeded, and cut into ¼-inch pieces",
          quantity: 1,
          name: "cucumber",
          order: 12,
          measurementUnitId: "clt6gfaif000f8gv973yi9mbr",
          ingredientId: "clt6dchcu0027f4v97dxg9399",
          groupId: "clt6irl0900064wv9e0rb6kp2",
        },
        {
          sentence: "¾ cup tomatoes chopped",
          quantity: 0.75,
          name: "tomatoes",
          order: 13,
          measurementUnitId: "clt6gfaic00028gv95ja6drhq",
          ingredientId: "clt6deiem003gy8v90uhf0fuh",
          groupId: "clt6irl0900064wv9e0rb6kp2",
        },
        {
          sentence: "1 small red onion chopped",
          quantity: 1,
          name: "red onion",
          order: 14,
          measurementUnitId: "clt6gfaif000f8gv973yi9mbr",
          ingredientId: "clt6deiec002cy8v9fb0u10y2",
          groupId: "clt6irl0900064wv9e0rb6kp2",
        },
        {
          sentence: "¼ cup flat-leaf parsley chopped",
          quantity: 0.25,
          name: "parsley",
          order: 15,
          measurementUnitId: "clt6gfaic00028gv95ja6drhq",
          ingredientId: "clt6deie4001hy8v9cmi3a5z5",
          groupId: "clt6irl0900064wv9e0rb6kp2",
        },
        {
          sentence: "1 tbsp red wine vinegar",
          quantity: 1,
          name: "red wine vinegar",
          order: 16,
          measurementUnitId: "clt6gfaib00008gv9fdsyfmgc",
          ingredientId: "clt6deiec002ey8v9bda855t4",
          groupId: "clt6irl0900064wv9e0rb6kp2",
        },

        {
          sentence: "¼ tsp Kosher salt",
          quantity: 0.25,
          name: "kosher salt",
          order: 17,
          measurementUnitId: "clt6gfaic00018gv97hstbg6h",
          ingredientId: "clt6irl0700004wv95x8ygszy",
          groupId: "clt6irl0900064wv9e0rb6kp2",
        },
        {
          sentence: "¼ tsp black pepper freshly ground",
          quantity: 0.25,
          name: "black pepper",
          order: 18,
          measurementUnitId: "clt6gfaic00018gv97hstbg6h",
          ingredientId: "clt6dchcg000qf4v9hw6k0of0",
          groupId: "clt6irl0900064wv9e0rb6kp2",
        },
        {
          sentence: "¼ cup extra-virgin olive oil",
          quantity: 0.25,
          name: "olive oil",
          order: 19,
          measurementUnitId: "clt6gfaic00028gv95ja6drhq",
          ingredientId: "clt6deie20019y8v90bin2nam",
          groupId: "clt6irl0a00074wv95kwkeih7",
        },
        {
          sentence: "2 cloves garlic minced",
          quantity: 2,
          name: "garlic",
          order: 20,
          measurementUnitId: "clt6gfaig000m8gv96xxg76hk",
          ingredientId: "clt6dchcx002lf4v9hi6xfpaf",
          groupId: "clt6irl0a00074wv95kwkeih7",
        },
        {
          sentence: "1 tsp oregano dried",
          quantity: 1,
          name: "oregano",
          order: 21,
          measurementUnitId: "clt6gfaic00018gv97hstbg6h",
          ingredientId: "clt6deie3001dy8v94gdyd6bn",
          groupId: "clt6irl0a00074wv95kwkeih7",
        },
        {
          sentence: "1 tsp rosemary dried",
          quantity: 1,
          name: "rosemary",
          order: 22,
          measurementUnitId: "clt6gfaic00018gv97hstbg6h",
          ingredientId: "clt6deied002jy8v97lvl8sw1",
          groupId: "clt6irl0a00074wv95kwkeih7",
        },
        {
          sentence: "1 pinch Kosher salt",
          quantity: 1,
          name: "kosher salt",
          order: 23,
          measurementUnitId: "clt6gfaig000i8gv9fj0kgn2x",
          ingredientId: "clt6irl0700004wv95x8ygszy",
          groupId: "clt6irl0a00074wv95kwkeih7",
        },
        {
          sentence: "1 pinch black pepper freshly ground",
          quantity: 1,
          name: "black pepper",
          order: 24,
          measurementUnitId: "clt6gfaig000i8gv9fj0kgn2x",
          ingredientId: "clt6dchcg000qf4v9hw6k0of0",
          groupId: "clt6irl0a00074wv95kwkeih7",
        },
        {
          sentence: "6 8-inch pita rounds preferably pocketless",
          quantity: 6,
          name: "pita bread",
          order: 25,
          measurementUnitId: "clt6gfaif000f8gv973yi9mbr",
          ingredientId: "clt6deie7001uy8v9cf2rahtq",
        },
        {
          sentence: "18 tbsp tzatziki sauce",
          quantity: 18,
          name: "tzatziki sauce",
          order: 26,
          measurementUnitId: "clt6gfaib00008gv9fdsyfmgc",
          ingredientId: "clt6irl0900044wv96j9306zj",
        },
      ],
    },
  },
};

// await db.recipeIngredientGroup.createMany({ data: ingredientGroups });
// const result = await db.recipe.create({
//   data: recipe,
//   include: {
//     nutritionLabel: { include: { nutrients: true } },
//     ingredients: { include: { ingredient: true } },
//   },
// });

// const result = await db.recipe.findFirst({
//   include: {
//     nutritionLabel: { include: { nutrients: { include: { nutrient: true } } } },
//     ingredients: { include: { ingredient: true } },
//   },
// });
// console.log(result);

// for (let i = 0; i < 200; i++) {
//   console.log(cuid());
// }
