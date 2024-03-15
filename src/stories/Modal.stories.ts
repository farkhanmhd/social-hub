import { Meta, StoryObj } from "@storybook/react";
import Modal from "../app/components/CommonModal/Modal";
import "../app/styles/globals.css";

const stories = {
  title: "Modal",
  component: Modal,
} as Meta;

export default stories;

const DefaultModal: StoryObj = {
  args: {
    title: "Title",
    message: "Message",
  },
};

export { DefaultModal };
