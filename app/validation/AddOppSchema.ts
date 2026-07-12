import * as yup from "yup";

export const AddOppSchema = yup.object({
  title: yup.string().required("Title is required."),
  organization: yup.string().required("Organization is required."),
  category: yup.string().required("Category is required."),
  type: yup.string().required("Type is required."),
  deadline: yup.string().required("Deadline is required."),
  location: yup.string().required("Location is required."),
  description: yup.string().required("Description is required."),
  workMode: yup.string().required("Work mode is required."),
  requirements: yup.string().required("Please list at least one requirement."),
  tags: yup.string().required("Please add at least one tag."),
  applyLink: yup
    .string()
    .url("Please enter a valid URL.")
    .required("Apply link is required."),
  featured: yup.boolean().required().default(false),
});