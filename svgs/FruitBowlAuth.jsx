import { View, Text } from "react-native";
import React from "react";
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg";

const FruitBowlAuth = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="162"
      height="162"
      viewBox="0 0 162 162"
      fill="none"
    >
      <G clipPath="url(#clip0_480_6463)">
        <Path
          d="M160.81 110.111C159.549 112.674 158.738 112.553 156.424 114.181C153.434 154.154 115.887 161.299 82.0127 162C47.0803 162.723 7.8369 153.797 6.75986 114.417C2.83041 110.495 2.55482 108.527 2.98165 102.8C2.54533 99.1997 6.93103 98.8409 7.06899 96.3194C4.1128 77.3135 3.47619 53.5986 19.7468 40.3801C18.8187 29.5144 -7.3294 19.116 18.4833 20.1835C12.6301 7.1438 20.1461 10.6622 29.3174 13.9877C35.8458 -1.09352 40.085 -3.81999 46.4331 13.9769C49.5456 13.3422 63.0321 7.00427 59.5677 14.9432C59.3823 16.294 56.1661 20.0592 58.6502 20.1791C83.5096 19.6115 56.7473 29.821 56.4553 40.5436C58.9447 42.7382 61.3399 44.9828 63.4608 47.6191C90.2557 13.0755 115.899 36.4819 101.335 11.028C102.603 4.73373 106.181 12.9109 108.285 14.0044C126.252 -1.16882 129.271 28.0852 109.576 20.3955C108.438 21.2495 108.016 25.0837 110.033 25.0976C114.789 25.4985 119.444 26.3791 123.924 28.0589C135.242 31.908 155.556 47.6792 153.042 59.8995C149.65 60.9506 146.208 46.7962 141.712 44.8762C139.83 61.6116 142.645 79.9837 140.43 97.0734C143.146 97.6044 146.123 97.3943 148.923 97.2085C152.972 89.5752 154.237 80.7845 153.79 72.2286C161.824 62.8006 155.451 94.4362 153.643 97.0582C162.055 97.0437 160.972 103.857 160.81 110.111ZM81.8886 116.952C81.8893 116.97 81.8896 116.989 81.8902 117.007C62.8979 117.612 43.9003 118.045 24.908 118.666C21.8993 119.618 9.59232 116.861 11.6635 121.735C16.6583 174.29 158.713 171.76 151.299 115.016C128.162 115.51 105.029 116.436 81.8886 116.952ZM108.67 74.6728C109.946 75.7597 111.756 75.4521 113.272 75.9312C115.064 76.4475 114.789 79.1939 112.996 79.4711C101.934 80.1251 93.732 67.03 82.5743 71.9707C69.8076 75.1803 63.7392 96.9079 80.847 97.3803C99.0128 96.4001 119.212 99.2908 136.426 96.3381C142.408 80.3539 122.541 63.0363 108.67 74.6728ZM82.0127 110.035C106.48 108.443 134.486 113.146 157.289 108.332C168.668 92.6093 26.4675 104.811 9.8002 101.183C-13.4569 116.883 74.6056 107.82 82.0127 110.035ZM50.9438 94.4447C63.3026 94.3697 59.5978 74.0441 82.8239 67.8853C83.8212 67.1664 88.0946 67.7543 86.8473 65.908C83.8779 62.5741 79.4077 59.478 74.9432 61.8156C74.3218 62.0308 74.623 62.9114 74.9255 63.3572C75.7655 65.7644 72.7407 66.4671 71.2115 65.1452C57.3077 56.3266 29.2769 93.0699 50.9438 94.4447ZM91.9285 67.149C105.556 73.4062 97.4808 70.4858 99.1945 59.4407C99.1742 49.8473 99.2631 40.2453 99.1543 30.6509C97.683 27.9703 91.5583 31.7476 89.0008 32.2355C86.442 33.2856 86.4569 33.0774 86.4559 35.9472C86.4534 42.6148 86.4541 49.2825 86.455 55.9501C85.1891 61.1411 90.6056 62.6317 91.9285 67.149ZM32.7719 85.4455C18.7358 74.9098 23.5768 68.7025 9.34078 78.9177C5.67395 96.6216 25.9296 98.8867 32.7719 85.4455ZM19.6177 67.423C25.3876 63.866 30.3799 59.2591 35.1187 54.4538C31.4449 50.6623 28.2005 45.6792 23.8996 42.8705C18.1929 45.7327 14.2827 51.6106 12.2571 57.5903C12.9171 61.3831 17.2835 64.2697 19.6177 67.423ZM34.9833 81.6657C38.4745 75.9182 41.5937 69.9096 46.174 64.911C43.8965 62.2235 40.8567 59.3382 37.861 57.4938C33.1004 62.0336 27.8759 66.2089 22.7786 70.3605C23.1595 72.1469 34.8064 82.2571 34.9833 81.6657ZM119.086 66.7937C121.31 66.7937 127.146 70.1795 126.58 66.1767C125.786 55.347 128.172 43.0255 125.675 32.8936C110.723 26.7635 114.161 29.403 113.848 42.7468C114.172 45.6137 118.92 42.749 120.99 43.3688C126.556 46.8889 121.595 61.9144 119.086 66.7937ZM49.5639 62.0213C53.5987 60.1415 57.7785 58.4829 62.3565 59.4546C68.9985 60.75 55.6687 42.6288 52.1543 42.7781C48.3211 46.2858 44.5419 50.5206 41.2665 54.5696C43.0618 56.6984 47.0975 60.3228 49.5639 62.0213ZM130.407 70.3709C140.511 79.5246 137.608 74.5352 138.465 64.2248C138.466 56.6443 137.291 50.2339 137.28 42.6528C137.955 39.1087 133.675 37.3309 131.063 35.8286C129.232 46.4418 131.007 59.086 130.407 70.3709ZM82.1718 57.66C83.2438 50.7538 82.3098 43.5384 82.5474 36.4965C81.7288 34.7063 76.1025 39.5577 75.7753 40.8964C75.6969 46.1285 75.6095 51.4283 75.8177 56.6617C77.2811 58.0653 80.1981 56.5639 82.1718 57.66ZM28.6988 41.0262C30.622 44.868 34.7216 47.8909 37.6281 51.1876C41.4139 49.8783 44.9403 44.4377 47.6316 41.1932C41.8686 38.8123 34.5881 39.1154 28.6988 41.0262ZM109.829 45.4641C110.063 41.2942 109.888 37.0312 109.933 32.8452C109.921 28.4563 110.319 28.8376 105.81 28.8119C100.533 27.1271 103.913 45.746 103.158 49.3597C103.904 50.3991 108.462 46.0535 109.829 45.4641ZM22.048 35.2299C39.8322 37.9197 26.0385 24.8281 17.1437 23.9918C8.35012 21.938 21.1355 30.662 22.048 35.2299ZM61.2789 23.8115C56.2214 24.25 48.3455 26.5977 46.8004 31.7893C53.3339 43.8567 55.7601 29.4783 61.4611 25.6292C62.5094 24.8338 63.2083 23.6729 61.2789 23.8115ZM52.722 21.8099C52.8055 20.2791 56.0382 15.6874 53.8237 15.5836C47.8152 17.4672 38.3151 21.9314 39.5468 29.4561C40.6137 35.4707 44.7185 24.3152 52.722 21.8099ZM23.4326 21.702C31.7281 24.923 32.913 33.2404 35.5057 24.1057C32.3407 19.7934 27.3769 16.6319 22.0496 15.5362C20.6378 16.6132 23.3117 19.9583 23.4326 21.702ZM102.915 63.9413C103.039 64.9908 103.19 69.1056 104.645 65.5957C107.153 59.4973 110.687 54.0415 114.642 48.8015C107.848 48.1887 102.221 56.8082 102.915 63.9413ZM40.3201 18.3845C45.0687 16.0434 40.7539 9.54976 38.6419 6.49264C36.3926 5.91836 35.5712 10.1474 34.6783 11.7266C34.0312 14.9182 37.88 17.0426 40.3201 18.3845ZM71.6627 58.7921C71.7434 54.2643 72.28 49.4157 71.4902 45.0243C69.5459 45.8609 65.6804 50.6348 66.2816 53.0366C67.7573 55.4568 67.6741 62.165 71.6627 58.7921ZM111.919 60.1289C118.351 60.4889 119.982 56.4801 119.39 50.6414C117.386 49.8814 112.743 58.0757 111.919 60.1289ZM16.3049 69.7666C14.963 68.7538 11.7043 62.5529 10.4378 64.6576C9.12278 72.8788 7.59169 77.0303 16.3049 69.7666ZM115.231 63.735C111.476 64.3668 107.125 65.802 107.217 70.3162C109.262 70.6826 116.208 65.7388 115.231 63.735ZM111.717 16.9163C115.186 20.3547 123.227 14.6316 117.681 13.5684C115.595 14.0997 112.458 14.6597 111.717 16.9163Z"
          fill="black"
        />
        <Path
          d="M153.19 42.6775C151.269 42.8319 148.457 42.0571 149.667 39.7267C153.031 36.2235 160.67 41.6252 153.19 42.6775Z"
          fill="black"
        />
        <Path
          d="M152.422 31.8738C151.794 33.446 149.611 36.2927 147.65 35.6573C143.67 33.8042 152.026 26.5161 152.422 31.8738Z"
          fill="black"
        />
        <Path
          d="M139.911 29.6472C140.126 23.1976 145.187 26.9714 143.653 31.6308C142.476 34.6493 139.128 32.2626 139.988 29.6494C139.963 29.6485 139.937 29.6478 139.911 29.6472Z"
          fill="black"
        />
        <Path
          d="M156.413 65.0357C156.564 67.2357 152.991 67.7182 152.756 65.3977C152.408 62.875 156.275 62.6383 156.413 65.0357Z"
          fill="black"
        />
        <Path
          d="M64.2435 71.6068C66.8317 71.6989 66.3362 75.5138 63.978 75.305C61.7483 75.0499 61.9366 71.4457 64.2435 71.6068Z"
          fill="black"
        />
        <Path
          d="M67.8515 68.1188C67.6891 70.582 63.9856 70.3754 64.1919 67.8616C64.321 65.6068 68.0258 65.8771 67.8515 68.1188Z"
          fill="black"
        />
        <Path
          d="M58.4001 68.8152C60.8971 68.5987 61.0455 72.4611 58.5424 72.4871C56.3627 72.5051 55.9122 69.1018 58.4001 68.8152Z"
          fill="black"
        />
        <Path
          d="M84.0757 131.741C82.3798 129.432 76.2772 133.868 77.9251 136.195C79.6242 138.489 85.741 134.072 84.0757 131.741Z"
          fill="black"
        />
        <Path
          d="M109.483 131.823C107.785 129.514 101.685 133.951 103.332 136.278C105.032 138.572 111.148 134.154 109.483 131.823Z"
          fill="black"
        />
        <Path
          d="M58.5637 131.823C56.8665 129.514 50.7656 133.951 52.4134 136.278C54.1135 138.572 60.229 134.154 58.5637 131.823Z"
          fill="black"
        />
        <Path
          d="M33.1038 131.823C31.4069 129.514 25.3056 133.951 26.9535 136.278C28.6535 138.572 34.769 134.154 33.1038 131.823Z"
          fill="black"
        />
        <Path
          d="M132.342 131.406C130.395 132.418 125.954 136.085 130.382 137.07C131.298 137.222 133.826 134.889 134.569 134.481C136.584 133.067 134.316 129.931 132.342 131.406Z"
          fill="black"
        />
        <Path
          d="M97.0896 136.195C98.7571 133.865 92.6349 129.448 90.94 131.741C89.2744 134.072 95.3883 138.488 97.0896 136.195Z"
          fill="black"
        />
        <Path
          d="M71.6811 136.278C73.3485 133.948 67.2276 129.531 65.5317 131.822C63.8665 134.154 69.9788 138.57 71.6811 136.278Z"
          fill="black"
        />
        <Path
          d="M122.601 136.278C124.268 133.948 118.147 129.53 116.452 131.822C114.786 134.154 120.898 138.57 122.601 136.278Z"
          fill="black"
        />
        <Path
          d="M46.1716 136.285C47.8387 133.954 41.7172 129.537 40.0219 131.83C38.3567 134.161 44.4699 138.576 46.1716 136.285Z"
          fill="black"
        />
        <Path
          d="M72.9568 124.394C73.8731 124.547 76.4015 122.214 77.1441 121.807C79.159 120.392 76.8907 117.257 74.9166 118.732C72.9669 119.743 68.5312 123.41 72.9568 124.394Z"
          fill="black"
        />
        <Path
          d="M98.3651 124.477C99.282 124.629 101.81 122.296 102.552 121.889C104.567 120.473 102.299 117.339 100.324 118.814C98.3749 119.825 93.9395 123.493 98.3651 124.477Z"
          fill="black"
        />
        <Path
          d="M47.446 124.477C48.363 124.629 50.8907 122.296 51.6333 121.889C53.6476 120.473 51.3799 117.339 49.4052 118.814C47.4558 119.825 43.0208 123.493 47.446 124.477Z"
          fill="black"
        />
        <Path
          d="M26.5969 119.237C24.9 116.928 18.7988 121.365 20.4466 123.692C22.1464 125.986 28.2622 121.568 26.5969 119.237Z"
          fill="black"
        />
        <Path
          d="M123.875 124.484C124.791 124.636 127.319 122.303 128.062 121.896C130.077 120.481 127.809 117.345 125.835 118.821C123.885 119.832 119.449 123.499 123.875 124.484Z"
          fill="black"
        />
        <Path
          d="M84.8558 121.807C86.2844 122.623 88.997 125.838 90.5818 123.61C92.2072 121.419 88.3009 119.828 87.0827 118.732C85.1096 117.258 82.8391 120.391 84.8558 121.807Z"
          fill="black"
        />
        <Path
          d="M59.4483 121.889C60.8769 122.705 63.5885 125.92 65.1743 123.693C66.7997 121.502 62.8939 119.91 61.6758 118.814C59.7024 117.34 57.4321 120.472 59.4483 121.889Z"
          fill="black"
        />
        <Path
          d="M110.367 121.889C111.796 122.705 114.507 125.92 116.093 123.693C117.719 121.502 113.813 119.91 112.595 118.814C110.621 117.34 108.351 120.472 110.367 121.889Z"
          fill="black"
        />
        <Path
          d="M141.13 121.041C139.724 120.244 136.951 116.988 135.404 119.237C133.778 121.428 137.684 123.02 138.902 124.116C140.866 125.589 143.15 122.46 141.13 121.041Z"
          fill="black"
        />
        <Path
          d="M33.9378 121.896C35.3667 122.712 38.0786 125.927 39.6638 123.699C41.2892 121.508 37.3825 119.916 36.1647 118.82C34.1919 117.347 31.9211 120.48 33.9378 121.896Z"
          fill="black"
        />
        <Path
          d="M74.9169 143.725C72.9701 144.737 68.5293 148.404 72.9574 149.389C73.8734 149.541 76.4015 147.208 77.1441 146.8C79.1593 145.386 76.891 142.25 74.9169 143.725Z"
          fill="black"
        />
        <Path
          d="M100.325 143.807C99.1292 144.894 95.1712 146.514 96.8264 148.686C98.4084 150.914 101.129 147.697 102.552 146.882C104.567 145.467 102.299 142.333 100.325 143.807Z"
          fill="black"
        />
        <Path
          d="M49.4046 143.807C48.2092 144.894 44.2513 146.514 45.9064 148.686C47.4885 150.914 50.2089 147.697 51.6324 146.882C53.6467 145.467 51.379 142.333 49.4046 143.807Z"
          fill="black"
        />
        <Path
          d="M125.835 143.814C123.888 144.826 119.447 148.493 123.875 149.478C124.791 149.63 127.319 147.297 128.062 146.889C130.077 145.474 127.809 142.338 125.835 143.814Z"
          fill="black"
        />
        <Path
          d="M90.1578 145.952C88.7526 145.156 85.9787 141.899 84.4318 144.149C82.8064 146.34 86.7128 147.931 87.9306 149.027C89.8945 150.501 92.1787 147.37 90.1578 145.952Z"
          fill="black"
        />
        <Path
          d="M64.7506 146.035C63.3454 145.238 60.5725 141.981 59.0246 144.231C57.3992 146.422 61.3049 148.013 62.5228 149.11C64.4867 150.583 66.7709 147.453 64.7506 146.035Z"
          fill="black"
        />
        <Path
          d="M115.67 146.035C114.245 145.218 111.521 142.003 109.944 144.231C108.318 146.422 112.224 148.014 113.442 149.11C115.406 150.583 117.69 147.453 115.67 146.035Z"
          fill="black"
        />
        <Path
          d="M39.2408 146.041C37.8356 145.244 35.0623 141.988 33.5148 144.238C31.8894 146.429 35.7958 148.02 37.0136 149.116C38.9772 150.59 41.2617 147.459 39.2408 146.041Z"
          fill="black"
        />
        <Path
          d="M144.406 160.537C144.406 161.195 129.555 162 111.234 162C92.9141 162 78.0625 161.195 78.0625 160.537C78.0625 159.878 118.769 154.446 137.089 154.446C148.797 154.446 144.406 159.878 144.406 160.537Z"
          fill="black"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_480_6463">
          <Rect width="162" height="162" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default FruitBowlAuth;