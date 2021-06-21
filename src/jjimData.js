import React, { useState, useEffect } from "react";
import jjimLists from "./Firebase.js";

// 지도에 표시하기 위해 찜리스트를 json에서 string 형태로 변환
const jjimData = JSON.parse(jjimLists);
export default jjimData;

//
