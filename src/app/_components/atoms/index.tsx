import { ErrorIcon, SuccessIcon, WarningIcon } from "@/app/_assets/icons";
import Image from "next/image";
import React from "react";

interface ModalIconProps {
  type: "success" | "error" | "warning";
}

function ModalIcon(props: Readonly<ModalIconProps>) {
  const { type } = props;
  switch (type) {
    case "success":
      return (
        <Image
          src={SuccessIcon}
          alt="Success Icon"
          className="w-24 h-24 mb-8"
        />
      );
    case "error":
      return (
        <Image src={ErrorIcon} alt="Error Icon" className="w-24 h-24 mb-8" />
      );
    case "warning":
      return (
        <Image
          src={WarningIcon}
          alt="Warning Icon"
          className="w-24 h-24 mb-8"
        />
      );
    default:
      return null;
  }
}

export default ModalIcon;
