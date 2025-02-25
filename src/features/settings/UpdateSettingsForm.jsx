import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettingsData from "./useSettingsData";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  // HOOKS
  const {
    settingsData = {},
    settingsError,
    isGettingSettings,
  } = useSettingsData();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settingsData;

  const { settingError, isSettingUpdating, updateSetting } = useUpdateSetting();

  function handleUpdate(value, field) {
    if (!value) return;
    updateSetting({ [field]: value });
  }

  if (isGettingSettings) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isSettingUpdating}
          onBlur={(e) => handleUpdate(e.target.value, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isSettingUpdating}
          onBlur={(e) => handleUpdate(e.target.value, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isSettingUpdating}
          onBlur={(e) => handleUpdate(e.target.value, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isSettingUpdating}
          onBlur={(e) => handleUpdate(e.target.value, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
