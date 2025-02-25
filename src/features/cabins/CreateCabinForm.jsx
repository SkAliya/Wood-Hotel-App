import { useForm } from "react-hook-form";
import { useState } from "react";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import ErrorFallback from "../../ui/ErrorFallback";
import FormRow from "../../ui/FormRow";
// import Spinner from "../../ui/Spinner";

import useEditCabin from "./useCreateEditCabin";
import useCreateCabin from "./useCreateCabin";

function CreateEditCabinForm({
  cabinData = {},
  setShowModel = { setShowModel },
}) {
  const { id: editId, ...editedData } = cabinData;
  const hasFormData = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: hasFormData ? editedData : {},
  });
  console.log(errors);

  const {
    error: createError,
    isLoading: isCreating,
    mutate: createCabin,
  } = useCreateCabin();

  const {
    error: editError,
    isLoading: isEditing,
    mutate: editCabin,
  } = useEditCabin();

  const inProgress = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    hasFormData
      ? editCabin(
          { newCabin: { ...data, image: image }, id: editId },
          {
            onSuccess: (data) => reset(),
          }
        )
      : createCabin(
          { ...data, image: data.image[0] },
          {
            onSuccess: (data) => reset(),
          }
        );
    console.log(data);
    setShowModel((show) => !show);
  }
  // another way getting form errors onsubmit like useform-formstate:errors
  function onError(err) {
    console.log(err);
  }
  if (createError || editError) return <ErrorFallback />;

  // {isCreating && <Spinner />}
  // const errors = {
  //   name: {
  //     message: "must fill this",
  //   },
  //   description: {
  //     message: "must fill this",
  //   },
  // };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={inProgress}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={inProgress}
          {...register("maxCapacity", {
            required: "This feild is required",
            min: {
              value: 2,
              message: "MaxCapacity alteast greaterthan 2",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={inProgress}
          {...register("regularPrice", {
            required: "This feild is required",
            min: {
              value: 50,
              message: "Price must be greater than 50",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={inProgress}
          {...register("discount", {
            required: "This feild is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={inProgress}
          {...register("description", {
            required: "This feild is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: hasFormData ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          size="medium"
          type="reset"
          onClick={() => setShowModel((show) => !show)}
        >
          Cancel
        </Button>
        <Button variation="primary" size="medium" disabled={inProgress}>
          {hasFormData ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEditCabinForm;
