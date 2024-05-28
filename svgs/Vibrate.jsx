import { View, Text } from "react-native";
import React from "react";
import { Path, Svg } from "react-native-svg";

const Vibrate = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <Path
        d="M11.8125 1.72266H6.1875C5.27639 1.72266 4.53516 2.46389 4.53516 3.375V14.625C4.53516 15.5361 5.27639 16.2773 6.1875 16.2773H11.8125C12.7236 16.2773 13.4648 15.5361 13.4648 14.625V3.375C13.4648 2.46389 12.7236 1.72266 11.8125 1.72266ZM12.4102 14.625C12.4102 14.9546 12.1421 15.2227 11.8125 15.2227H6.1875C5.85795 15.2227 5.58984 14.9546 5.58984 14.625V3.375C5.58984 3.04545 5.85795 2.77734 6.1875 2.77734H11.8125C12.1421 2.77734 12.4102 3.04545 12.4102 3.375V14.625Z"
        fill={color || "#1F2C35"}
      />
      <Path
        d="M9.28125 13.2539H8.71875C8.42752 13.2539 8.19141 13.49 8.19141 13.7812C8.19141 14.0725 8.42752 14.3086 8.71875 14.3086H9.28125C9.57248 14.3086 9.80859 14.0725 9.80859 13.7812C9.80859 13.49 9.57248 13.2539 9.28125 13.2539Z"
        fill={color || "#1F2C35"}
      />
      <Path
        d="M15.9961 7.59375C15.9961 6.93918 15.8291 6.50521 15.4197 6.09588C15.2138 5.88997 14.8799 5.88997 14.674 6.09588C14.468 6.30179 14.468 6.63571 14.674 6.84165C14.8355 7.00316 14.9414 7.1428 14.9414 7.59375C14.9414 7.7097 14.8718 7.81977 14.7487 8.00438C14.5927 8.23848 14.3789 8.55907 14.3789 9C14.3789 9.44093 14.5927 9.76152 14.7487 9.99563C14.8718 10.1802 14.9414 10.2903 14.9414 10.4063C14.9414 10.8572 14.8355 10.9968 14.674 11.1584C14.4681 11.3643 14.4681 11.6982 14.674 11.9042C14.7769 12.0071 14.9119 12.0586 15.0469 12.0586C15.1818 12.0586 15.3168 12.0071 15.4197 11.9041C15.8291 11.4948 15.9961 11.0608 15.9961 10.4063C15.9961 9.96532 15.7823 9.64473 15.6263 9.41063C15.5032 9.22602 15.4336 9.11595 15.4336 9C15.4336 8.88406 15.5032 8.77398 15.6263 8.58938C15.7823 8.35527 15.9961 8.03468 15.9961 7.59375Z"
        fill={color || "#1F2C35"}
      />
      <Path
        d="M17.4375 9C17.4375 8.88406 17.5071 8.77398 17.6302 8.58938C17.7863 8.35527 18 8.03468 18 7.59375C18 6.81472 17.7061 6.41345 17.3885 6.09588C17.1826 5.88997 16.8487 5.88997 16.6427 6.09588C16.4368 6.30179 16.4368 6.63571 16.6427 6.84165C16.852 7.0509 16.9453 7.20914 16.9453 7.59375C16.9453 7.7097 16.8757 7.81977 16.7527 8.00438C16.5966 8.23848 16.3828 8.55907 16.3828 9C16.3828 9.44093 16.5966 9.76152 16.7527 9.99563C16.8757 10.1802 16.9453 10.2903 16.9453 10.4063C16.9453 10.8572 16.8394 10.9968 16.6779 11.1584C16.472 11.3643 16.472 11.6982 16.6779 11.9042C16.7809 12.0071 16.9158 12.0586 17.0508 12.0586C17.1857 12.0586 17.3207 12.0071 17.4236 11.9041C17.833 11.4948 18 11.0608 18 10.4063C18 9.96532 17.7863 9.64473 17.6302 9.41063C17.5071 9.22602 17.4375 9.11595 17.4375 9Z"
        fill={color || "#1F2C35"}
      />
      <Path
        d="M3.62109 9C3.62109 8.55907 3.40734 8.23848 3.25125 8.00437C3.1282 7.81977 3.05859 7.70969 3.05859 7.59375C3.05859 7.1428 3.16448 7.00316 3.32599 6.84162C3.53194 6.63571 3.53194 6.30179 3.32599 6.09585C3.12008 5.88994 2.78617 5.88994 2.58022 6.09585C2.17086 6.50521 2.00391 6.93917 2.00391 7.59375C2.00391 8.03468 2.21766 8.35527 2.37375 8.58937C2.4968 8.77398 2.56641 8.88405 2.56641 9C2.56641 9.11594 2.4968 9.22602 2.37375 9.41062C2.21766 9.64473 2.00391 9.96532 2.00391 10.4062C2.00391 11.0608 2.17086 11.4948 2.58026 11.9041C2.6832 12.0071 2.81816 12.0586 2.95312 12.0586C3.08809 12.0586 3.22305 12.0071 3.32599 11.9041C3.53194 11.6982 3.53194 11.3643 3.32599 11.1583C3.16448 10.9968 3.05859 10.8572 3.05859 10.4062C3.05859 10.2903 3.1282 10.1802 3.25125 9.99562C3.40734 9.76152 3.62109 9.44093 3.62109 9Z"
        fill={color || "#1F2C35"}
      />
      <Path
        d="M1.61719 9C1.61719 8.55907 1.40344 8.23848 1.24734 8.00437C1.1243 7.81977 1.05469 7.70969 1.05469 7.59375C1.05469 7.1428 1.16058 7.00316 1.32209 6.84162C1.52803 6.63571 1.52803 6.30179 1.32209 6.09585C1.11618 5.88994 0.782262 5.88994 0.576316 6.09585C0.166957 6.50521 0 6.93917 0 7.59375C0 8.03468 0.21375 8.35527 0.369844 8.58937C0.492891 8.77398 0.5625 8.88405 0.5625 9C0.5625 9.11594 0.492891 9.22602 0.369844 9.41062C0.21375 9.64473 0 9.96532 0 10.4062C0 11.0608 0.166957 11.4948 0.576352 11.9041C0.679289 12.0071 0.814254 12.0586 0.949219 12.0586C1.08418 12.0586 1.21915 12.0071 1.32209 11.9041C1.52803 11.6982 1.52803 11.3643 1.32209 11.1583C1.16058 10.9968 1.05469 10.8572 1.05469 10.4062C1.05469 10.2903 1.1243 10.1802 1.24734 9.99562C1.40344 9.76152 1.61719 9.44093 1.61719 9Z"
        fill={color || "#1F2C35"}
      />
      <Path
        d="M9 4.74609C9.29124 4.74609 9.52734 4.50999 9.52734 4.21875C9.52734 3.92751 9.29124 3.69141 9 3.69141C8.70876 3.69141 8.47266 3.92751 8.47266 4.21875C8.47266 4.50999 8.70876 4.74609 9 4.74609Z"
        fill={color || "#1F2C35"}
      />
    </Svg>
  );
};

export default Vibrate;
