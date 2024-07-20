/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

// 14. Updating Data Without Navigation
// The Last feature allow users to mark their orders as priority orders even after placing them., without causing a new navigation.
function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    // This button is only shown if the order's priority is false (not a priority order).
    // The button is wrapped in a fetcher.Form component from React Router, with method set to "patch".
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
  // PUT vs PATCH Request
  // A PUT request requires sending the entire updated object to the server.
  // A PATCH request only sends the data that has changed, and the server updates the original object with the new data.

  // Difference between fetcher.Form and normal Form
  // A normal React Router <Form> component causes a new navigation when submitted, taking the user to a different page.
  // The fetcher.Form component does not cause a navigation when submitted.
  // Instead, it submits the form data and allows React Router to revalidate the page data in the background, re-rendering the component with the updated data.
  // Even though the UpdateOrder component doesn't have any input fields, the fetcher.Form can still be used to submit data to the server.
  // In this case, the form submission only triggers the action function, which updates the order's priority field on the server.
  // The lack of input fields means that the action function doesn't need to read any data from the request object, as the required data (orderId) is already available from the route params.
}

export default UpdateOrder;

// Connecting the Action
// An action function is created to handle the form submission.
// The action function uses the updateOrder service to send a PATCH request to the server, updating only the priority field to true.
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

// Revalidation and Automatic Re-render
// After submitting the form, the page automatically re-renders with the updated data, thanks to React Router's revalidation feature.
// Revalidation means that React Router detects the data change and automatically re-fetches the data in the background, then re-renders the component with the new data.
