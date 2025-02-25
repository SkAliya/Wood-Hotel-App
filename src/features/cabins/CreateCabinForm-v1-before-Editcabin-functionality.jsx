import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FileInput from "../../ui/FileInput";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import ErrorFallback from "../../ui/ErrorFallback";
import FormRow from "./FormRow";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createCabin } from "../../services/APICabins";
// import Spinner from "../../ui/Spinner";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm();
  console.log(errors);

  const queryClient = useQueryClient();

  const {
    error,
    isLoading: isCreating,
    mutate,
  } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      // alert("Are you sure, You want to delete Cabin!");
      toast.success("Cabin created successfully", {
        icon: "👍",
        iconTheme: {
          primary: "green",
          secondary: "blue",
        },
      });
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (e) => {
      // alert(e.message);
      toast.error(e.message, {
        icon: "👎",
        iconTheme: {
          primary: "red",
          secondary: "black",
        },
      });
    },
  });
  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }
  function onError(err) {
    console.log(err);
  }
  if (error) return <ErrorFallback />;
  // {error && }
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
          disabled={isCreating}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" size="medium" type="reset">
          Cancel
        </Button>
        <Button variation="primary" size="medium" disabled={isCreating}>
          Add cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
