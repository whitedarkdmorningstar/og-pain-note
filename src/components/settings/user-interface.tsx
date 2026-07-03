import { useSettings } from "@/context/settings.context";
import ListItem from "../ui/list-item";
import NumberInput from "../ui/number-input";
import Section from "../ui/section";

export default function UserInterface() {
  const { maxTime, changeMaxTime } = useSettings();

  return (
    <Section title={"User Interface"}>
      <ListItem
        title={"Maximum Duration"}
        right={
          <NumberInput
            value={maxTime}
            step={60 * 1000} // 1 min
            maximumValue={60 * 60 * 1000} // max 60 min
            minimumValue={1 * 60 * 1000} // min 1 min
            onValueChange={changeMaxTime}
          />
        }
      />
    </Section>
  );
}
