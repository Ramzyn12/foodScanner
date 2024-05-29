import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const PhotoPhrame = ({color}) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="111"
      height="74"
      viewBox="0 0 111 74"
      fill="none"
    >
      <Path
        d="M87.7025 3.27367C87.1625 3.27367 86.5031 16.9563 86.5031 33.8347C86.5031 50.7131 87.1625 64.3957 87.7025 64.3957C88.5673 77.1554 92.0693 77.8788 93.7275 62.4624C94.6968 53.4502 93.7274 15.7173 93.7274 9.49055C93.7274 -1.29568 88.2425 3.27367 87.7025 3.27367Z"
        fill={color || "black"}
      />
      <Path
        d="M90.5937 2.76727C90.5829 1.57705 89.627 0.607974 88.4406 0.599302C81.2862 0.538599 74.1338 0.410689 66.9794 0.415025C56.2767 0.551607 34.7551 0.805259 24.0547 0.937505L2.59122 1.07842C1.57715 1.07409 0.752547 1.90225 0.756853 2.92336C1.07981 22.9207 0.765465 44.8085 1.45228 64.8969C1.52548 68.5564 1.87212 71.1147 2.26612 72.1271C2.08311 72.2919 2.30487 72.5368 2.62137 72.5975C3.50626 72.9097 5.79061 73.1179 9.84689 73.055C35.991 73.6924 62.4817 74.0111 88.6925 73.9308C89.7669 73.9287 90.6432 73.0507 90.6453 71.9645C90.8456 48.8995 90.7465 25.8323 90.5937 2.76727ZM9.79952 70.8892C6.61952 71.0301 4.29857 71.3661 3.09933 71.7304C4.2512 50.5775 3.96485 26.2377 4.41698 4.78565C30.2338 5.10434 60.4493 4.51465 86.3005 4.90706C86.3673 15.2114 86.6622 60.1469 86.7268 70.0242L9.79952 70.8892ZM81.9687 11.2961C81.9751 10.2901 81.1548 9.4728 80.158 9.48364L11.2657 9.19313C10.0148 9.09991 8.92755 10.0907 8.93616 11.3611L9.16438 63.3858C9.14285 64.4828 10.0385 65.3847 11.1279 65.363C18.9348 65.1787 34.6819 64.9685 42.4909 64.975C53.0515 64.9251 64.0599 64.5912 74.5171 64.2595C77.5571 64.1598 79.8436 63.8606 79.9534 63.5181C78.7413 62.4926 73.053 62.5989 68.2841 62.3734C69.2766 55.5009 71.7892 45.112 63.7089 41.5327C72.8657 36.7632 68.6393 21.8237 58.4276 22.1858C48.2503 21.9646 43.8861 36.6786 53.185 41.4633C45.3824 44.9603 47.4881 54.9589 48.6873 61.8097C46.6958 61.7642 44.6806 61.7208 42.6395 61.6775C43.5179 54.8679 45.6774 44.8801 37.7199 41.5652C47.4752 36.8022 42.7708 21.4725 32.2383 22.0925C22.2074 22.1532 18.009 36.7328 27.1593 41.4785C19.7852 45.1922 21.8284 54.8007 22.7499 61.3913C19.4386 61.3718 16.222 61.374 13.1044 61.3978C13.2164 45.4416 13.253 29.4853 13.24 13.5312C34.9425 13.6158 56.66 13.3925 78.3796 13.1518C78.6121 26.3071 78.7714 44.1841 79.1073 56.689C80.58 79.2033 81.7792 37.806 81.7275 34.3286C81.7232 34.3221 81.9794 11.2982 81.9687 11.2961ZM51.8587 32.4923C52.2312 29.1298 55.2174 26.4502 58.4405 26.5195C66.3873 26.5716 67.4573 38.4369 59.6397 40.5008C59.2156 40.7826 58.5912 40.5788 58.3199 41.0644C58.1089 40.6655 57.6719 40.5723 57.2843 40.4162C53.5919 39.4601 51.3377 35.8396 51.8587 32.4923ZM57.8829 42.7685C58.0314 42.7251 58.1628 42.5929 58.2661 42.4107C58.3651 42.6471 58.5159 42.8292 58.7268 42.879C68.1032 45.615 64.0879 54.9915 65.9696 62.2975C61.9693 62.1653 57.8054 62.0287 57.8054 62.0287C55.6609 61.9745 53.4304 61.9203 51.1676 61.8683C52.7006 54.7313 49.0749 45.7516 57.8829 42.7685ZM25.8524 32.7459C26.0936 29.3552 29.1444 26.4458 32.3954 26.4241C40.635 26.3374 41.9139 38.3176 33.8315 40.3815C33.3428 40.5376 32.9208 40.8086 32.7356 41.2032C32.6452 40.8997 32.3007 40.5441 31.8809 40.5311C28.0873 39.9674 25.4369 36.0478 25.8524 32.7459ZM31.9433 42.7381C32.262 42.6817 32.5246 42.5473 32.7076 42.3696C32.7894 42.6947 32.9595 42.9657 33.2136 43.0264C42.0302 45.8123 38.2452 54.727 40.1248 61.6255C35.2353 61.5301 30.2919 61.4585 25.4412 61.4152C26.8342 54.4278 23.6025 45.7451 31.9433 42.7381Z"
        fill={color || "black"}
      />
    </Svg>
  );
};

export default PhotoPhrame;
