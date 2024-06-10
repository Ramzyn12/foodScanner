import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";
import { useColourTheme } from "../context/Themed";
import { themedColours } from "../constants/themedColours";

const TimelineHealth = () => {
  const { theme } = useColourTheme();
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="84"
      height="84"
      viewBox="0 0 84 84"
      fill="none"
    >
      <Path
        d="M8.14478 15.065L8.20872 17.9091C8.24921 19.776 8.35044 24.6352 8.38454 26.4414C8.41651 27.02 8.36323 28.1026 8.48684 28.6844C8.68397 29.5508 9.34251 30.285 10.1737 30.5844C10.6223 30.789 11.2776 30.7346 11.754 30.7421C11.754 30.7421 14.0812 30.7229 14.4094 30.7208C15.264 31.5616 17.1448 33.4104 17.8556 34.1105C18.4384 34.8436 19.7182 35.1984 20.6144 34.7083C21.2442 34.4046 22.07 33.3773 22.5762 32.9372L24.8224 30.7197C25.4298 30.7304 27.3575 30.7666 27.3575 30.7666C27.8157 30.7613 28.3933 30.8401 28.8557 30.6963C29.9831 30.4171 30.8367 29.3515 30.8686 28.1857L30.9059 26.8122L30.9795 24.0917L31.2277 13.2088C31.313 11.4676 29.6272 9.93952 27.9319 10.0599L27.2211 10.0471C24.8651 9.99706 22.4643 9.98961 20.1114 10.012L14.4233 10.1004L11.5792 10.1452C10.3495 10.0322 8.92267 10.6641 8.40159 11.8608C7.87092 12.9488 8.20126 14.0378 8.14478 15.065ZM9.53965 26.4414C9.57268 24.6139 9.67605 19.8016 9.71547 17.9091L9.77941 15.065C9.82949 14.5301 9.71228 13.0234 9.97654 12.6525C10.3879 12.0409 10.7107 11.9599 11.5781 12.0057L14.4222 12.0505L20.1104 12.1389C22.4643 12.1581 24.8629 12.157 27.2211 12.1059C28.3197 12.0451 29.1818 12.0419 29.3203 13.2066L29.5686 24.0896L29.6421 26.8101C29.6112 27.4238 29.8531 28.5725 29.3725 29.0787C28.9442 29.7447 28.0725 29.7522 27.3575 29.7426L24.637 29.7927C24.5177 29.7927 24.4005 29.8363 24.311 29.928L21.9549 32.3139L20.7774 33.5073C20.1189 34.2916 19.113 34.3055 18.4555 33.5116C17.6979 32.7625 15.7137 30.6963 14.9284 29.9259C14.8453 29.8417 14.727 29.7884 14.6002 29.7895L11.7561 29.766C11.4268 29.7468 10.8248 29.8086 10.5264 29.6488C10.017 29.4602 9.63555 28.986 9.53539 28.4575C9.47145 28.108 9.54924 26.8303 9.53965 26.4414Z"
        fill={themedColours.primaryText[theme]}
      />
      <Path
        d="M33.719 15.065L33.7829 17.9091C33.8234 19.7761 33.9247 24.6352 33.9588 26.4414C33.9907 27.02 33.9374 28.1026 34.0611 28.6844C34.2582 29.5508 34.9167 30.285 35.7479 30.5844C36.1965 30.789 36.8519 30.7346 37.3282 30.7421C37.3282 30.7421 39.6554 30.7229 39.9836 30.7208C40.8383 31.5616 42.719 33.4104 43.4298 34.1105C44.0127 34.8436 45.2925 35.1984 46.1886 34.7083C46.8184 34.4046 47.6442 33.3773 48.1504 32.9372L50.3967 30.7197C51.004 30.7304 52.9317 30.7666 52.9317 30.7666C53.3899 30.7613 53.9675 30.8401 54.4299 30.6963C55.5573 30.4171 56.4109 29.3515 56.4429 28.1857L56.4802 26.8122L56.5537 24.0917L56.802 13.2088C56.8872 11.4676 55.2014 9.93953 53.5061 10.0599L52.7953 10.0472C50.4393 9.9992 48.0374 9.99174 45.6846 10.0141L39.9964 10.1026L37.1524 10.1473C35.9227 10.0344 34.4958 10.6663 33.9758 11.8629C33.4451 12.9509 33.7755 14.0399 33.719 15.0672V15.065ZM35.1139 26.4414C35.1469 24.6139 35.2503 19.8016 35.2897 17.9091L35.3536 15.065C35.4037 14.5301 35.2865 13.0234 35.5508 12.6525C35.9621 12.0409 36.285 11.9599 37.1524 12.0057L39.9964 12.0505L45.6846 12.1389C48.0385 12.1581 50.4371 12.157 52.7953 12.1059C53.8939 12.0451 54.756 12.042 54.8945 13.2066L55.1428 24.0896L55.2164 26.8101C55.1855 27.4238 55.4273 28.5726 54.9468 29.0787C54.5184 29.7447 53.6467 29.7522 52.9317 29.7426L50.2112 29.7927C50.0919 29.7927 49.9747 29.8364 49.8852 29.928L47.5291 32.3139L46.3517 33.5073C45.6931 34.2916 44.6872 34.3055 44.0297 33.5116C43.2721 32.7625 41.2879 30.6963 40.5026 29.9259C40.4195 29.8417 40.3012 29.7884 40.1744 29.7895L37.3303 29.766C37.001 29.7468 36.399 29.8086 36.1006 29.6488C35.5913 29.4602 35.2098 28.986 35.1096 28.4575C35.0457 28.108 35.1235 26.8303 35.1139 26.4414Z"
        fill={themedColours.primaryText[theme]}
      />
      <Path
        d="M21.1887 72.0947C21.7066 73.2957 23.1387 73.918 24.3652 73.8104L27.2093 73.8551L32.8975 73.9436C35.2514 73.9659 37.65 73.9563 40.0082 73.9105L40.7189 73.8977C42.4196 74.0245 44.0958 72.4858 44.0148 70.7489L43.7665 59.8649L43.693 57.1444L43.6557 55.7709C43.6237 54.6051 42.7691 53.5406 41.6428 53.2603C41.1803 53.1154 40.5964 53.2006 40.1446 53.19C40.1446 53.19 37.9313 53.2305 37.6095 53.2369C37.1098 52.7435 35.3632 51.0194 35.3632 51.0194C34.8592 50.5771 34.0238 49.5478 33.4015 49.2484C32.5053 48.755 31.2266 49.1151 30.6426 49.8451C29.9212 50.5526 28.0554 52.3919 27.1965 53.2347C26.5689 53.2294 24.541 53.2124 24.541 53.2134C24.0605 53.2145 23.4072 53.1676 22.9597 53.3711C22.1275 53.6706 21.47 54.4048 21.2729 55.2711C21.1226 55.8582 21.2377 56.9356 21.1706 57.5142C21.1365 59.3406 21.0352 64.1561 20.9947 66.0464L20.9308 68.8905C20.9798 69.9231 20.6591 71.0078 21.1887 72.0947ZM22.3203 55.4981C22.4205 54.9695 22.802 54.4953 23.3113 54.3067C23.6118 54.1469 24.2182 54.2151 24.541 54.1895L27.3851 54.1661C27.5045 54.1661 27.6238 54.1213 27.7133 54.0297C28.4784 53.2507 30.5031 51.1941 31.2404 50.4439C31.8979 49.6522 32.9038 49.6629 33.5624 50.4482L34.7399 51.6417L37.0959 54.0275C37.179 54.1107 37.2962 54.1639 37.422 54.1629L40.1424 54.213C40.8628 54.1991 41.7238 54.213 42.1575 54.8768C42.6423 55.3841 42.3781 56.5328 42.4271 57.1455L42.3536 59.866L42.1053 70.75C41.9689 71.9168 41.1025 71.9104 40.006 71.8507C37.65 71.8006 35.2482 71.7985 32.8953 71.8177L27.2072 71.9061L24.3631 71.9509C23.4957 71.9946 23.1749 71.9136 22.7615 71.3041C22.4919 70.9279 22.6198 69.4169 22.5644 68.8916L22.5004 66.0475C22.461 64.1795 22.3566 59.3225 22.3246 57.5153C22.331 57.1284 22.2575 55.8391 22.3193 55.4991L22.3203 55.4981Z"
        fill={themedColours.primaryText[theme]}
      />
      <Path
        d="M46.763 72.0947C47.2809 73.2957 48.7131 73.918 49.9396 73.8104L52.7836 73.8551L58.4718 73.9436C60.8257 73.9659 63.2244 73.9563 65.5825 73.9105L66.2933 73.8977C67.994 74.0245 69.6702 72.4858 69.5892 70.7489L69.3409 59.8649L69.2674 57.1444L69.2301 55.7709C69.1981 54.6051 68.3435 53.5406 67.2171 53.2603C66.7547 53.1154 66.1707 53.2006 65.7189 53.19C65.7189 53.19 63.5057 53.2305 63.1839 53.2369C62.6841 52.7435 60.9376 51.0194 60.9376 51.0194C60.4336 50.5771 59.5981 49.5478 58.9758 49.2484C58.0797 48.755 56.8009 49.1151 56.217 49.8451C55.4956 50.5526 53.6297 52.3919 52.7709 53.2347C52.1432 53.2294 50.1154 53.2124 50.1154 53.2134C49.6348 53.2145 48.9816 53.1676 48.534 53.3711C47.7018 53.6706 47.0443 54.4048 46.8472 55.2711C46.697 55.8582 46.812 56.9356 46.7449 57.5142C46.7108 59.3406 46.6096 64.1561 46.5691 66.0464L46.5051 68.8905C46.5542 69.9231 46.2334 71.0078 46.763 72.0947ZM47.8947 55.4981C47.9948 54.9695 48.3763 54.4953 48.8857 54.3067C49.1862 54.1469 49.7925 54.2151 50.1154 54.1895L52.9595 54.1661C53.0788 54.1661 53.1982 54.1213 53.2877 54.0297C54.0528 53.2507 56.0774 51.1941 56.8148 50.4439C57.4723 49.6522 58.4782 49.6629 59.1367 50.4482L60.3142 51.6417L62.6702 54.0275C62.7534 54.1107 62.8706 54.1639 62.9963 54.1629L65.7168 54.213C66.4371 54.1991 67.2981 54.213 67.7318 54.8768C68.2167 55.3841 67.9524 56.5328 68.0014 57.1455L67.9396 59.4397C67.7968 59.2756 67.6466 59.1083 67.4867 58.941C66.9508 58.3784 66.3412 57.8179 65.8361 57.4257C65.331 57.0336 64.9282 56.8088 64.8046 56.9153C64.6714 56.9963 64.6288 57.17 64.7098 57.3032C65.2064 58.047 65.7679 58.73 66.3902 59.3523C66.7014 59.6635 67.0285 59.9597 67.3695 60.2389C67.5422 60.3806 67.7308 60.5064 67.9109 60.6396C67.8949 61.3375 67.8693 62.4394 67.8416 63.6669C67.5475 63.2023 67.0946 62.6418 66.5767 62.0728C66.5277 62.0185 66.4787 61.9652 66.4297 61.9108C65.8532 61.2853 65.2373 60.6726 64.6618 60.1728C64.3091 59.866 63.9884 59.606 63.7241 59.4568C63.6367 59.4078 63.5451 59.4099 63.4822 59.4536C63.397 59.5122 63.3522 59.6091 63.3693 59.6997C63.3853 59.7839 63.4172 59.8734 63.4716 59.9544C64.0417 60.8079 64.6832 61.6029 65.3651 62.3563C65.4568 62.4586 65.5506 62.5587 65.6443 62.6589C66.0386 63.0787 66.4489 63.4826 66.8751 63.8715C67.1692 64.1401 67.4718 64.4011 67.7819 64.6547C67.7936 64.6643 67.8064 64.6675 67.8192 64.675C67.7904 65.9409 67.7606 67.2505 67.7361 68.33C67.7286 68.3087 67.7212 68.2874 67.7137 68.2724C67.3685 67.5042 66.5416 66.2862 65.5239 65.1236C65.4674 65.0597 65.412 64.9957 65.3556 64.9318C64.7066 64.1987 64.0246 63.4826 63.3448 62.839C62.9825 62.4958 62.6372 62.1762 62.3058 61.9247C62.2174 61.8576 62.1023 61.8533 62.016 61.9098C61.9094 61.9812 61.8689 62.1154 61.919 62.2252C61.9659 62.3254 62.0224 62.4277 62.0906 62.5257C62.8077 63.5689 63.5877 64.5578 64.4168 65.504C64.5286 65.6319 64.6416 65.7587 64.7556 65.8844C65.233 66.4119 65.7264 66.9255 66.2379 67.4221C66.5916 67.7663 66.9529 68.103 67.3226 68.4323L67.7265 68.785C67.6999 69.9476 67.6817 70.7478 67.6817 70.7478C67.6221 71.2529 67.4207 71.53 67.1287 71.6866C66.2283 70.3898 65.2703 69.1409 64.2473 67.9474C63.1817 66.7039 62.049 65.5168 60.8523 64.3883C60.7618 64.3063 60.6232 64.2924 60.5156 64.3628C60.3877 64.4459 60.3515 64.6185 60.4346 64.7464C61.367 66.1018 62.3666 67.4029 63.4332 68.6465C64.3912 69.7643 65.411 70.8299 66.4766 71.855C66.2059 71.8752 65.9065 71.8667 65.5836 71.8497C64.843 71.8337 64.0939 71.8305 63.3458 71.823C62.9324 71.0931 62.2952 70.182 61.5279 69.3007C61.4693 69.2336 61.4107 69.1654 61.351 69.0983C60.7383 68.4025 60.0947 67.7247 59.4479 67.1109C59.0792 66.7614 58.7243 66.4364 58.3855 66.1796C58.3045 66.1189 58.1947 66.1146 58.1106 66.169C58.0061 66.2372 57.9656 66.3682 58.0147 66.4727C58.0743 66.6005 58.1457 66.7316 58.232 66.8584C58.9055 67.8451 59.6397 68.7807 60.4197 69.6748C60.5412 69.8133 60.6627 69.9518 60.7863 70.0882C61.2434 70.5944 61.7176 71.0856 62.2088 71.5619C62.2973 71.6472 62.39 71.7282 62.4795 71.8124C61.5396 71.807 60.6051 71.8092 59.6695 71.8124C59.401 71.3904 59.0078 70.897 58.5666 70.4068C58.5176 70.3525 58.4686 70.2971 58.4185 70.2427C57.8974 69.6726 57.3391 69.1153 56.8095 68.6561C56.4631 68.3556 56.1445 68.1041 55.8835 67.9645C55.811 67.9261 55.7311 67.9293 55.6714 67.9688C55.5904 68.022 55.5478 68.1115 55.5595 68.1936C55.5744 68.2959 55.6107 68.4067 55.6767 68.5079C56.1829 69.289 56.7573 70.0136 57.371 70.6988C57.4659 70.8054 57.5628 70.9109 57.6598 71.0142C57.9198 71.2924 58.199 71.5534 58.4761 71.8156H58.4729C58.4729 71.8156 57.1909 71.8358 55.844 71.8561C55.7289 71.7207 55.6064 71.5833 55.4775 71.4447C55.0182 70.9556 54.4886 70.4708 54.0421 70.133C53.5956 69.7952 53.2312 69.6034 53.1012 69.7003C52.9637 69.7771 52.9136 69.9508 52.9904 70.0882C53.3985 70.7425 53.8705 71.3382 54.4044 71.871L54.4119 71.8774L52.7858 71.9029L49.9417 71.9477C49.0743 71.9914 48.7535 71.9104 48.3401 71.3009C48.0705 70.9247 48.1984 69.4137 48.143 68.8884L48.079 66.0443C48.0396 64.1763 47.9352 59.3193 47.9032 57.5121C47.9096 57.1252 47.8361 55.8359 47.8979 55.4959L47.8947 55.4981Z"
        fill={themedColours.primaryText[theme]}
      />
      <Path
        d="M7.89643 42.8462C7.89643 42.8462 14.2666 42.5361 15.9886 42.453C16.7079 46.5076 22.5441 46.7058 23.614 42.8707L28.9164 43.0348C30.064 46.5193 35.3856 46.514 36.4012 42.8707L41.7036 43.0348C42.8512 46.5193 48.1728 46.514 49.1883 42.8707L54.4907 43.0348C55.6394 46.5215 60.9674 46.5151 61.9787 42.8654C64.0992 42.9144 69.7032 43.0444 69.7032 43.0444C71.1375 43.0487 71.1343 40.9079 69.7032 40.9132C69.7032 40.9132 63.511 41.0571 62.0746 41.0901C61.432 36.8458 55.194 36.8512 54.3692 40.926L49.2864 41.0827C48.6385 36.8448 42.4058 36.8522 41.5821 40.926L36.4992 41.0827C35.8513 36.8448 29.6186 36.8522 28.7949 40.926L23.712 41.0827C23.0354 36.6572 16.2795 36.8703 15.9449 41.5014C15.0956 41.4599 13.2415 41.3704 11.5227 41.2862L7.8975 41.1104C6.6987 41.0805 6.70297 42.8771 7.8975 42.8473L7.89643 42.8462ZM60.2226 41.9778C60.4474 45.4761 55.2324 45.6562 55.2942 41.9778C55.6405 38.9046 59.8059 39.0388 60.2226 41.9778ZM47.4354 41.9778C47.6603 45.4761 42.4452 45.6562 42.507 41.9778C42.8533 38.9046 47.0188 39.0388 47.4354 41.9778ZM34.6482 41.9778C34.8731 45.4761 29.6581 45.6562 29.7199 41.9778C30.0662 38.9046 34.2316 39.0388 34.6482 41.9778ZM21.8611 41.9778C22.0859 45.4761 16.8709 45.6562 16.9327 41.9778C17.279 38.9046 21.4444 39.0388 21.8611 41.9778Z"
        fill={themedColours.primaryText[theme]}
      />
    </Svg>
  );
};

export default TimelineHealth;