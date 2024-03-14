import { Meta, StoryObj } from "@storybook/react";
import Button from "../app/components/Button/Button";
import "../app/styles/globals.css";

const stories = {
  title: "Button",
  component: Button,
} as Meta;

export default stories;

const DefaultButton: StoryObj = {
  args: {
    type: "submit",
    children: "Post",
    disabled: false,
  },
};

const DisabledButton: StoryObj = {
  args: {
    type: "button",
    children: "Post",
    disabled: true,
  },
};

export { DefaultButton, DisabledButton };
