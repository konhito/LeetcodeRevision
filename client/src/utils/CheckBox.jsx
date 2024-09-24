import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import "./styles.css";

export const CheckboxDemo = ({ checked, onCheckedChange }) => {
  return (
    <Checkbox.Root
      className="CheckboxRoot"
      checked={checked}
      onCheckedChange={onCheckedChange}
    >
      <Checkbox.Indicator className="CheckboxIndicator">
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
};
