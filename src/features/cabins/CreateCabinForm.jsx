import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";

function CreateCabinForm({ cabinToEdit = {}, setShowForm }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const queryClient = useQueryClient();

  //! Mutation hook for adding a new cabin
  const { isLoading: isAdding, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin successfully added");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
      setShowForm(false);
    },
    onError: (err) => toast.error(err.message),
  });

  //! Mutation hook for editing a cabin
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset(getValues());
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isAdding || isEditing;

  // Calling the mutation functions after submitting the form
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image: image }, id: editId });
    } else {
      createCabin({ ...data, image: image });
    }
  }
  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "Cabin name is required",
          })}
        />
      </FormRow>
      <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          min={0}
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          min={0}
          id="regularPrice"
          {...register("regularPrice", {
            required: "Regular price is required",
            min: { value: 1, message: "Price should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          min={0}
          defaultValue={0}
          {...register("discount", {
            required: "Discount is required",
            //* Solved with max attribute in the input
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isWorking}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "Description is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors?.image?.message}>
        <FileInput
          disabled={isWorking}
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Image is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
