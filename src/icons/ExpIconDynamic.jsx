import { TbCreditCard, TbTruckDelivery } from "react-icons/tb";
import {
  AiOutlineCar,
  AiOutlineMedicineBox,
  AiOutlinePaperClip,
  AiOutlineShoppingCart,
  AiOutlineSlack,
} from "react-icons/ai";
import { BiDollarCircle, BiDonateHeart, BiReceipt } from "react-icons/bi";

export const ExpIconFun = ({ title }) => {
  let size = 32;
  if (title === "groceries") {
    return <AiOutlineShoppingCart size={size} />;
  }
  if (title === "medicine") {
    return <AiOutlineMedicineBox size={size} />;
  }
  if (title === "investment") {
    return <BiDollarCircle size={size} />;
  }
  if (title === "stationery") {
    return <AiOutlinePaperClip size={size} />;
  }
  if (title === "travel") {
    return <TbTruckDelivery size={size} />;
  }
  if (title === "vehicle expense") {
    return <AiOutlineCar size={size} />;
  }
  if (title === "utility bills") {
    return <BiReceipt size={size} />;
  }
  if (title === "fee") {
    return <TbCreditCard size={size} />;
  }
  if (title === "donation") {
    return <BiDonateHeart size={size} />;
  }
  return <AiOutlineSlack size={size} />;
};
