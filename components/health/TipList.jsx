import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useRef, useState } from "react";
import SaladBowl from "../../svgs/SaladBowl";
import Carousel from "react-native-reanimated-carousel";
import { Path, Svg } from "react-native-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import COLOURS from "../../constants/colours";
import Shuttle from "../../svgs/Shuttle";
import ShareIcon from "../../svgs/ShareIcon";
import ArrowDown from "../../svgs/ArrowDown";
import Animated, {
  Easing,
  Extrapolate,
  Extrapolation,
  FadeIn,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import ArrowLeft from "../../svgs/ArrowLeft";
import TipsHeader from "./TipsHeader";
import CurrentIndexLabel from "./CurrentIndexLabel";
import GoToTopButton from "./GoToTopButton";
import TipCard from "./TipCard";

const { height, width } = Dimensions.get("window"); // Get the height of the device screen
const CARD_HEIGHT = height * 0.65; // Set card height to 75% of the screen height
const CARD_MARGIN = 40;

const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_1126_4878)">
<path d="M6.10492 6.48126L4.02565 6.6419C3.44708 6.68662 2.93179 6.98985 2.61182 7.47383L0.213854 11.1006C-0.0288162 11.4676 -0.067394 11.927 0.110589 12.3293C0.288619 12.7317 0.654475 13.0121 1.08924 13.0795L2.99305 13.3743C3.43841 11.0109 4.50452 8.65329 6.10492 6.48126Z" fill="white"/>
<path d="M10.6256 21.0069L10.9205 22.9107C10.9879 23.3455 11.2683 23.7113 11.6706 23.8893C11.838 23.9634 12.0152 24 12.1915 24C12.4391 24 12.685 23.9278 12.8994 23.7861L16.5262 21.3881C17.0102 21.0681 17.3134 20.5528 17.3581 19.9743L17.5187 17.8951C15.3466 19.4955 12.9891 20.5616 10.6256 21.0069Z" fill="white"/>
<path d="M9.9096 19.6873C9.97569 19.6873 10.0422 19.6819 10.1085 19.6708C11.0987 19.5053 12.053 19.2264 12.9634 18.8613L5.13865 11.0365C4.77359 11.9469 4.49468 12.9012 4.32912 13.8915C4.26387 14.2818 4.39479 14.6794 4.67459 14.9593L9.04068 19.3254C9.27299 19.5576 9.58654 19.6873 9.9096 19.6873Z" fill="white"/>
<path d="M22.0863 10.6407C24.0011 6.93881 24.072 3.02684 23.9719 1.19216C23.9376 0.563527 23.4364 0.0623433 22.8078 0.0280779C22.509 0.0117655 22.155 0 21.7559 0C19.7044 0 16.4583 0.310732 13.3592 1.9137C10.8964 3.18762 7.66683 5.99264 5.76147 9.67896C5.78397 9.69653 5.80596 9.71519 5.82668 9.73591L14.2641 18.1733C14.2848 18.1941 14.3034 18.216 14.321 18.2385C18.0073 16.3331 20.8124 13.1036 22.0863 10.6407ZM13.9545 5.07371C15.3251 3.70305 17.5555 3.70291 18.9262 5.07371C19.5902 5.73769 19.9559 6.62057 19.9559 7.55961C19.9559 8.49865 19.5902 9.38154 18.9262 10.0455C18.241 10.7308 17.3405 11.0735 16.4404 11.0736C15.5399 11.0736 14.6399 10.731 13.9545 10.0455C13.2904 9.38154 12.9247 8.49865 12.9247 7.55961C12.9247 6.62057 13.2904 5.73769 13.9545 5.07371Z" fill="white"/>
<path d="M14.9489 9.05114C15.7713 9.87356 17.1096 9.87361 17.932 9.05114C18.3304 8.6527 18.5498 8.12301 18.5498 7.55958C18.5498 6.99614 18.3304 6.46645 17.932 6.06806C17.5208 5.65683 16.9806 5.45123 16.4404 5.45123C15.9003 5.45123 15.3601 5.65683 14.9489 6.06806C14.5505 6.46645 14.3311 6.99614 14.3311 7.55958C14.3311 8.12301 14.5505 8.65275 14.9489 9.05114Z" fill="white"/>
<path d="M0.717431 19.7782C0.897384 19.7782 1.07734 19.7096 1.21459 19.5722L3.5102 17.2766C3.78479 17.002 3.78479 16.5569 3.5102 16.2823C3.23565 16.0077 2.79043 16.0077 2.51584 16.2823L0.220228 18.5779C-0.0543662 18.8525 -0.0543662 19.2976 0.220228 19.5722C0.357524 19.7095 0.537478 19.7782 0.717431 19.7782Z" fill="white"/>
<path d="M5.61394 18.3861C5.3394 18.1115 4.89418 18.1115 4.61958 18.3861L0.206067 22.7996C-0.0685264 23.0742 -0.0685264 23.5193 0.206067 23.7939C0.343364 23.9312 0.523317 23.9999 0.70327 23.9999C0.883224 23.9999 1.06318 23.9312 1.20043 23.7939L5.6139 19.3804C5.88854 19.1058 5.88854 18.6607 5.61394 18.3861Z" fill="white"/>
<path d="M6.72331 20.4899L4.42775 22.7855C4.15315 23.0601 4.15315 23.5052 4.42775 23.7798C4.56504 23.9171 4.745 23.9858 4.9249 23.9858C5.10481 23.9858 5.28481 23.9172 5.42206 23.7798L7.71767 21.4842C7.99226 21.2096 7.99226 20.7644 7.71767 20.4899C7.44312 20.2153 6.9979 20.2153 6.72331 20.4899Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_1126_4878">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>`;

const tipSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="103" viewBox="0 0 120 103" fill="none">
<path d="M63.6964 31.6346C64.0661 31.8499 64.4727 31.9587 64.8924 31.9587C65.1164 31.9587 65.3382 31.9282 65.5622 31.8652C66.1863 31.6868 66.7148 31.2758 67.0475 30.7061C67.3911 30.1189 67.4846 29.4404 67.315 28.7946C67.1519 28.1726 66.7583 27.6529 66.2103 27.3332C65.0555 26.6591 63.5507 27.0766 62.8613 28.2618C62.5199 28.8467 62.4242 29.5252 62.5938 30.1711C62.7548 30.7952 63.1462 31.315 63.6964 31.6346ZM64.19 29.0403C64.3727 28.7293 64.6924 28.551 65.0142 28.551C65.1577 28.551 65.3034 28.588 65.4317 28.6641C65.6253 28.7772 65.7645 28.962 65.8232 29.186C65.8884 29.4339 65.8514 29.697 65.7166 29.9275L65.7144 29.9297C65.584 30.1537 65.3817 30.3146 65.1382 30.382C64.912 30.4429 64.6771 30.4212 64.4727 30.3016C64.2792 30.1885 64.14 30.0037 64.0813 29.7797C64.016 29.5318 64.0552 29.2708 64.19 29.0403Z" fill="black"/>
<path d="M56.3438 47.4356C56.3438 45.6959 55.5305 44.3302 55.437 44.1802L54.3888 42.4861L53.3407 44.1802C53.2472 44.3302 52.4338 45.6959 52.4338 47.4356C52.4338 49.1753 53.2472 50.541 53.3407 50.691L54.3888 52.3851L55.437 50.691C55.5284 50.541 56.3438 49.1753 56.3438 47.4356ZM54.3888 50.043C54.3888 50.043 53.6669 48.8752 53.6669 47.4356C53.6669 45.996 54.3888 44.8282 54.3888 44.8282C54.3888 44.8282 55.1108 45.996 55.1108 47.4356C55.1108 48.8752 54.3888 50.043 54.3888 50.043Z" fill="black"/>
<path d="M49.4068 55.7123C48.1759 56.9431 47.7867 58.4828 47.7454 58.6546L47.2887 60.5944L49.2285 60.1377C49.4003 60.0964 50.9421 59.7071 52.1708 58.4763C53.4016 57.2454 53.7909 55.7058 53.8322 55.534L54.2889 53.5942L52.3491 54.0509C52.1795 54.0922 50.6376 54.4814 49.4068 55.7123ZM51.3009 57.6064C50.2832 58.6241 48.9479 58.9394 48.9479 58.9394C48.9479 58.9394 49.2633 57.6042 50.281 56.5865C51.2987 55.5688 52.634 55.2534 52.634 55.2534C52.634 55.2534 52.3186 56.5887 51.3009 57.6064Z" fill="black"/>
<path d="M59.3688 55.7123C58.1379 54.4814 56.5983 54.0922 56.4265 54.0509L54.4867 53.5942L54.9434 55.534C54.9847 55.7058 55.3739 57.2476 56.6048 58.4763C57.8356 59.7071 59.3753 60.0964 59.5471 60.1377L61.4869 60.5944L61.0302 58.6546C60.9889 58.4828 60.5996 56.941 59.3688 55.7123ZM57.4768 57.6042C56.4569 56.5887 56.1438 55.2513 56.1438 55.2513C56.1438 55.2513 57.479 55.5666 58.4967 56.5843C59.5145 57.602 59.8298 58.9373 59.8298 58.9373C59.8298 58.9373 58.4946 58.622 57.4768 57.6042Z" fill="black"/>
<path d="M51.3944 53.3963C51.8858 53.3963 52.1968 53.3463 52.1968 53.3463L54.1431 53.0331L53.021 51.4195C52.9188 51.276 51.9837 49.9908 50.3831 49.3058C49.4241 48.897 48.4695 48.81 47.8366 48.81C47.3452 48.81 47.0342 48.86 47.0342 48.86L45.0879 49.1731L46.21 50.7867C46.3122 50.9302 47.2473 52.2155 48.8478 52.9005C49.8047 53.3093 50.7615 53.3963 51.3944 53.3963ZM47.2169 50.0778C47.2169 50.0778 47.4583 50.0408 47.8345 50.0408C48.3542 50.0408 49.1306 50.1104 49.896 50.4366C51.2204 51.002 52.0098 52.1241 52.0098 52.1241C52.0098 52.1241 51.7684 52.1611 51.3922 52.1611C50.8724 52.1611 50.0961 52.0915 49.3306 51.7653C48.0063 51.2021 47.2169 50.0778 47.2169 50.0778Z" fill="black"/>
<path d="M61.7414 48.86C61.7414 48.86 61.4282 48.81 60.9389 48.81C60.3061 48.81 59.3514 48.897 58.3924 49.3058C56.7919 49.9886 55.8568 51.2738 55.7546 51.4195L54.6216 53.0309L56.5788 53.3463C56.5788 53.3463 56.8919 53.3963 57.3812 53.3963C58.014 53.3963 58.9687 53.3093 59.9277 52.9005C61.5282 52.2176 62.4633 50.9324 62.5655 50.7867L63.6985 49.1753L61.7414 48.86ZM59.4428 51.7675C58.6773 52.0959 57.8988 52.1633 57.3812 52.1633C57.0028 52.1633 56.7636 52.1263 56.7636 52.1263C56.7636 52.1263 57.553 51.0042 58.8774 50.4388C59.6428 50.1104 60.4213 50.043 60.9389 50.043C61.3173 50.043 61.5565 50.08 61.5565 50.08C61.5565 50.08 60.7671 51.2021 59.4428 51.7675Z" fill="black"/>
<path d="M120 58.0587C120 56.9888 119.92 55.9319 119.793 54.8837C119.791 54.8859 119.789 54.8903 119.787 54.8924C119.815 54.7272 119.848 54.5641 119.848 54.3966C119.848 52.8526 118.584 51.4652 116.358 50.23C115.79 45.9416 113 42.8732 110.253 40.7225C114.82 39.3111 119.887 34.951 119.848 29.51C119.804 23.7342 115.244 18.428 109.416 17.0754C110.714 13.5351 110.242 9.96434 108.042 6.89157C105.067 2.74235 99.5367 0.415483 94.2566 1.11137C89.2789 1.76376 85.3363 4.90612 83.0442 10.0057C77.8816 7.1634 69.8615 7.06554 66.1298 11.3822C63.9726 13.8722 62.8874 17.2146 62.8352 20.905C58.188 19.8111 53.2538 19.635 48.7588 20.52C47.9716 20.3917 47.1909 20.3091 46.4319 20.3591C46.8582 19.3871 47.0974 18.2867 47.1278 17.1059C47.2061 14.0092 45.8883 10.8842 43.5984 8.74871C39.908 5.30625 34.1996 4.57557 30.2548 6.86112C28.3998 3.59916 25.3162 1.60066 21.6258 1.31144C17.7027 1.00699 13.821 2.81411 11.8138 5.9282C10.6308 7.7636 9.14769 11.5605 11.7116 17.1102C9.33036 17.7952 7.07526 19.3479 5.59433 21.3769C4.8593 22.3837 4.38305 23.4428 4.13514 24.5149C3.50884 25.052 2.91299 25.637 2.37368 26.3068C-2.99986 32.9873 1.60603 43.4342 7.69503 50.267C5.51386 51.4935 4.27649 52.8678 4.27649 54.3966C4.27649 54.6554 4.31999 54.9098 4.38957 55.1621C4.28302 56.1211 4.20038 57.0823 4.20038 58.0609C4.20038 58.4371 4.22648 58.8111 4.2417 59.1852L4.20038 59.1917C4.20908 59.2461 4.23952 59.2939 4.24822 59.3483C4.93976 73.7031 17.1025 86.0985 34.765 92.492C34.0321 93.0161 33.4276 93.712 33.4276 94.621C33.4276 98.9768 48.5174 102.01 62.0611 102.01C75.6047 102.01 90.6924 98.9746 90.6924 94.621C90.6924 93.7207 90.1031 93.0335 89.3789 92.5116C107.6 85.9311 120 72.9724 120 58.0587ZM116.458 52.7374C117.245 53.3071 117.671 53.866 117.671 54.3944C117.671 55.0642 117.014 55.7797 115.77 56.506C116.147 55.2665 116.392 54.0074 116.458 52.7374ZM67.7717 12.8044C70.9293 9.15537 78.7536 9.58377 82.942 12.4956L84.0859 13.2915L84.5795 11.9868C86.4758 6.95898 90.0139 3.86229 94.5394 3.26644C98.9713 2.69016 103.795 4.69735 106.274 8.15721C108.259 10.9277 108.483 14.2201 106.902 17.4255L106.222 18.8086L107.752 18.9869C113.093 19.611 117.636 24.4366 117.673 29.5252C117.71 34.5813 111.549 38.8936 107.509 39.0284L104.121 39.1415L106.941 41.0204C111.639 44.1475 113.97 47.3095 114.276 50.965C114.468 53.2528 113.996 55.597 112.998 57.7782C110.556 58.6937 107.191 59.5918 102.988 60.3965C102.694 60.4443 102.396 60.4921 102.096 60.54C104.891 52.3829 104.495 43.3734 99.0191 39.2437C91.4079 33.5114 77.4597 39.7678 70.527 48.9687C69.7941 49.9408 69.1743 50.9259 68.6372 51.9175C68.4871 47.2507 66.1146 43.1407 62.533 40.6159C71.8252 40.8442 79.3734 36.5232 81.8829 34.8923C83.2551 35.0684 84.5186 35.1771 85.5951 35.1771C91.3666 35.1771 93.1215 32.972 93.5673 32.1631C94.124 31.1562 94.0653 30.0363 93.4238 29.3099C93.0867 28.9294 92.6213 28.7293 92.1124 28.6858C92.169 28.4727 92.2451 28.2618 92.2669 28.0487C92.4017 26.833 91.9602 25.6413 91.0817 24.8606C90.2792 24.1473 89.1201 23.7972 87.9067 23.8886C87.0673 23.9516 86.3083 24.2213 85.7125 24.6671C84.9601 25.2281 84.486 26.0806 84.4729 26.8896L85.7038 26.9091C85.7103 26.4873 86.0126 25.9827 86.4519 25.6544C86.9651 25.2673 87.5783 25.1499 88.0002 25.1172C88.8831 25.0498 89.7095 25.289 90.2618 25.7827C90.8425 26.2981 91.1339 27.094 91.0425 27.9117C90.9229 28.9707 90.164 30.1102 89.0571 30.8887C88.1394 31.5324 87.0151 31.9587 85.5211 32.224C84.9231 32.3305 84.3251 32.4045 83.727 32.4784C83.4791 32.5088 83.2312 32.5545 82.9833 32.5871L82.5027 32.411C80.0758 31.5194 73.865 26.3285 71.5077 24.28C69.5201 23.1209 67.3194 22.1989 65.0208 21.4943C64.9555 18.0888 65.8493 15.0247 67.7717 12.8044ZM87.6131 54.3727C85.6038 52.8613 83.0964 52.2611 80.5564 52.6873C78.0273 53.1114 75.7613 54.4988 74.1804 56.5974C72.6929 58.5719 72.0992 60.8944 72.2101 63.1408C71.1598 63.1735 70.1007 63.2017 69.033 63.2257C68.9199 62.8321 68.8286 62.4319 68.7568 62.0296C68.0957 58.2392 69.3026 54.1705 72.2449 50.2626C76.8921 44.0932 85.2167 39.185 91.8428 39.185C94.0566 39.185 96.079 39.7308 97.7122 40.9617C102.592 44.6368 102.559 53.3158 99.6519 60.9053C97.0293 61.2794 94.2045 61.6208 91.2078 61.9209C91.2448 59.0199 90.0292 56.1929 87.6131 54.3727ZM89.9661 62.0427C84.8752 62.5276 79.3212 62.8929 73.441 63.1039C73.3344 61.1271 73.8563 59.083 75.1676 57.3389C76.5572 55.4948 78.5449 54.2748 80.7608 53.903C81.2262 53.8247 81.6894 53.7877 82.1461 53.7877C83.8619 53.7877 85.5015 54.327 86.8716 55.36C89.0005 56.9627 90.0422 59.4722 89.9661 62.0427ZM60.9738 63.2996C56.1526 63.2822 51.4793 63.1582 47.0169 62.9451C43.6462 60.627 41.415 56.7691 41.415 52.3785C41.415 45.2914 47.1778 39.5264 54.265 39.5264C61.3521 39.5264 67.1171 45.2914 67.1171 52.3785C67.1171 57.0018 64.6467 61.0358 60.9738 63.2996ZM66.8627 63.2648C65.7775 63.28 64.6837 63.2909 63.5833 63.2953C64.6967 62.3449 65.671 61.238 66.4538 59.9963C66.4517 60.8053 66.4973 61.6077 66.6365 62.3993C66.6887 62.6929 66.7887 62.9756 66.8627 63.2648ZM43.3026 42.4905C43.5614 42.4209 43.7854 42.3447 44.0333 42.273C42.6263 43.6974 41.5281 45.4153 40.8083 47.3225C40.6365 46.9267 40.4799 46.5288 40.3494 46.1243C40.0494 45.2044 39.7688 44.278 39.4926 43.3538C40.6017 43.1537 41.8565 42.8797 43.3026 42.4905ZM39.0447 41.8642C38.1465 38.8501 37.218 35.8708 35.8001 33.083C36.1981 32.1261 36.6417 31.1714 37.194 30.2255C37.7899 29.2121 38.5314 28.3227 39.3535 27.5072C41.228 33.7332 48.6588 36.5102 51.8011 37.4192C50.4398 38.2086 47.367 39.8004 42.9003 41.003C41.4042 41.4053 40.1429 41.6728 39.0447 41.8642ZM83.3726 33.8419L83.4856 33.7593C83.6161 33.7375 83.7466 33.7136 83.8771 33.6962C84.4969 33.6201 85.1166 33.544 85.7364 33.4331C87.413 33.133 88.6917 32.6437 89.766 31.8934C90.525 31.3585 91.1317 30.6908 91.5666 29.9689C91.9515 29.8558 92.2908 29.8927 92.4974 30.1254C92.7931 30.4582 92.7888 31.0236 92.4865 31.5694C91.6645 33.059 88.844 34.3225 83.3726 33.8419ZM70.2508 26.0175C70.9575 26.6395 76.3615 31.3585 79.9801 33.5309C76.131 35.8447 65.447 41.1183 54.1302 36.8103C53.8235 30.4408 60.3714 24.4648 62.1698 22.9491C65.0816 23.6037 67.8565 24.6258 70.2508 26.0175ZM60.2431 22.5794C57.714 24.8737 52.7558 30.1059 52.5709 36.0274C49.8265 35.2576 41.9848 32.5306 40.6626 26.359C45.5838 22.5251 53.1581 21.4247 60.2431 22.5794ZM13.4578 18.9565L15.041 18.7499L14.2711 17.3538C12.1226 13.4481 11.8964 9.80776 13.6405 7.10251C15.2215 4.65386 18.2964 3.23599 21.4583 3.4752C24.7442 3.73181 27.4364 5.70639 28.8478 8.89441L29.4219 10.1883L30.5244 9.30107C33.5754 6.8459 38.8794 7.31779 42.1153 10.3362C43.9289 12.0281 45.0162 14.5985 44.9532 17.0471C44.9075 18.7999 44.2747 20.2787 43.1678 21.2072L37.6877 25.8153L38.1552 25.6196C37.0636 26.646 36.1067 27.8138 35.3347 29.1382C35.0172 29.684 34.7302 30.232 34.4649 30.7822C34.1452 30.2929 33.8255 29.8014 33.4624 29.3295C28.1671 22.4685 16.1283 18.5933 7.69068 22.2837C9.13464 20.5353 11.3289 19.2348 13.4578 18.9565ZM7.12092 25.1477C13.9058 21.2551 24.3223 23.2579 29.8612 28.5293C34.4496 32.8938 36.1828 39.3068 37.8443 45.2001C38.3597 47.0311 39.1099 48.7469 40.0298 50.3692C39.9363 51.0281 39.8732 51.6935 39.8732 52.3785C39.8732 52.5221 39.8928 52.6613 39.8971 52.8026L29.6763 45.585L22.2216 27.3854L21.0799 27.8529L27.8018 44.2584L16.7437 36.4515L13.8188 27.8203L12.651 28.2161L15.0323 35.2445L6.38372 29.1382L5.67479 30.145L28.6695 46.3809L28.676 46.3983L28.6868 46.3939L40.0341 54.4053C40.0754 54.7032 40.1276 54.9968 40.1885 55.2882C39.5448 55.1208 38.812 55.1121 37.7051 55.2882C34.3039 55.8319 31.1529 56.8605 27.643 56.8801C19.6469 56.9257 12.3379 53.4724 7.77114 46.8267C3.53277 40.6638 -1.3841 30.0276 7.12092 25.1477ZM9.19336 51.8436C10.9157 53.5442 12.6945 54.9403 14.3625 55.8515C19.9361 58.8938 26.4035 59.6092 32.6229 58.6546C35.5435 58.2066 38.3597 57.1127 41.1606 58.2805C41.9369 59.9963 43.0395 61.5294 44.3899 62.8081C35.3478 62.2927 27.2733 61.4142 20.7799 60.3247C11.5441 58.5241 6.45113 56.2777 6.45113 54.3966C6.45113 53.5898 7.40363 52.7178 9.19336 51.8436ZM62.0611 99.8358C46.4211 99.8358 36.0045 96.1976 35.5979 94.6579C35.6 94.6536 35.8458 94.1404 37.6485 93.4619C45.0771 95.7996 53.3582 97.1153 62.098 97.1153C70.8205 97.1153 79.0863 95.8062 86.5041 93.4771C88.1937 94.1121 88.496 94.5992 88.5178 94.5992C88.1024 96.2019 77.6902 99.8358 62.0611 99.8358ZM62.1002 94.9385C34.0125 94.9385 10.7265 81.1099 6.93173 63.2017C12.8359 67.5684 26.771 68.3513 35.039 68.808C35.8893 68.8536 36.6613 68.8971 37.3376 68.9406C46.4863 69.5169 55.9242 69.9758 65.4622 69.9758C76.4833 69.9758 87.6392 69.3625 98.6255 67.6076L98.4298 66.3898C78.0599 69.643 57.0659 68.9471 37.4137 67.7098C36.7352 67.6663 35.9588 67.6228 35.1064 67.5771C26.9711 67.127 11.1353 66.2506 6.60988 61.3337C6.4968 60.4921 6.41199 59.644 6.3859 58.785C9.16291 60.0224 13.2099 61.1032 18.0615 62.0187C29.2109 64.4935 45.6882 65.7656 62.0611 65.7656C78.2187 65.7656 94.4872 64.5283 105.626 62.1188C110.71 61.1815 114.937 60.0659 117.812 58.785C117.225 78.7874 92.4582 94.9385 62.1002 94.9385Z" fill="black"/>
</svg>`;

const data = {
  week: 2,
  title: "Fresh Start",
  description:
    "Embark on a journey toward health, feeling empowered and motivated.",
  svg: svgString,
  tips: [
    {
      week: 2,
      title: "Fresh Start",
      description:
        "Embark on a journey toward health, feeling empowered and motivated.",
      svg: svgString,
    },
    {
      svg: tipSvg,
      info: "Choosing to eliminate processed foods from your diet sets the foundation for profound long-term health benefits.",
    },
    {
      svg: tipSvg,
      info: "Choosing to eliminate processed foods from your diet sets the foundation for profound long-term health benefits.",
    },
    {
      svg: tipSvg,
      info: "Choosing to eliminate processed foods from your diet sets the foundation for profound long-term health benefits.",
    },
    {
      svg: tipSvg,
      info: "Choosing to eliminate processed foods from your diet sets the foundation for profound long-term health benefits.",
    },
  ],
};

const DATA = new Array(6).fill(null).map((_, index) => ({
  id: String(index),
  text: `Tip #${index}: Choosing to eliminate processed foods from your diet sets the foundation for profound long-term health benefits.`,
}));

const TipList = ({ onSlideChange }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const carouselRef = useRef(null);
  const navigation = useNavigation();
  const scrollY = useSharedValue(0); // Step 2: Use useSharedValue to track scroll position

  // Step 3: Create an animated scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, CARD_HEIGHT / 2], // Adjust these values based on your header height and desired fade effect
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const handleScrollToStart = () => {
    if (currentTipIndex === 0) {
      setCurrentTipIndex(1);
      carouselRef.current.scrollToIndex({ index: 1 });
    } else {
      carouselRef.current.scrollToIndex({ index: 0 });
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentTipIndex(newIndex);
      onSlideChange(newIndex); // Info
    }
  }).current;

  const renderItem = ({ item, index }) => {
    const headerCard = index === 0;

    if (headerCard)
      return (
        <Animated.View style={headerStyle}>
          <TipsHeader
            handleScrollToStart={handleScrollToStart}
            cardWidth={width}
            numItems={data.tips.length - 1}
            cardHeight={CARD_HEIGHT}
          />
        </Animated.View>
      );
    //Else
    return (
      <TipCard cardHeight={CARD_HEIGHT} cardMargin={CARD_MARGIN} item={item} />
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Actions */}
      <View style={styles.topActionsContainer}>
        {/* Go Back Button */}
        <Pressable
          onPress={() => navigation.navigate("Health")}
          style={styles.backButtonContainer}
        >
          <ArrowLeft />
        </Pressable>
        {currentTipIndex > 0 && (
          <CurrentIndexLabel numItems={data.tips.length - 1} currentTipIndex={currentTipIndex} />
        )}
      </View>

      {/* Go To Top Button */}
      {currentTipIndex > 1 && (
        <GoToTopButton handleScrollToStart={handleScrollToStart} />
      )}

      {/* List of tip cards */}
      <Animated.FlatList
        data={data.tips}
        renderItem={renderItem}
        onScroll={scrollHandler} // Use the animated scroll handler
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
          waitForInteraction: true,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        ref={carouselRef}
        // keyExtractor={(item) => item.id}
        keyExtractor={(item, index) => index.toString()}
        snapToAlignment="start"
        snapToInterval={CARD_HEIGHT + CARD_MARGIN}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        getItemLayout={(data, index) => ({
          length: CARD_HEIGHT + CARD_MARGIN,
          offset: (CARD_HEIGHT + CARD_MARGIN) * index,
          index,
        })}
      />
    </View>
  );
};

export default TipList;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  topActionsContainer: {
    position: "absolute",
    paddingHorizontal: 30,
    top: 10,
    zIndex: 300,
    flexDirection: "row",
    alignItems: "center",
  },
  cardContainer: {
    backgroundColor: "white",
    padding: 40,
    gap: 40,
    width: "95%",
    alignSelf: "center",
    borderRadius: 20,
    height: CARD_HEIGHT,
    marginVertical: CARD_MARGIN / 2,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F6EF",
    borderRadius: 20,
  },
  contentContainer: {
    alignItems: "center",
    paddingTop: (height - CARD_HEIGHT) / 2 - CARD_MARGIN, // Center the first item
    paddingBottom: (height - CARD_HEIGHT) / 2,
    paddingHorizontal: 30,
  },
  backButtonContainer: {
    backgroundColor: "white",
    width: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    height: 40,
    alignSelf: "flex-start",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
