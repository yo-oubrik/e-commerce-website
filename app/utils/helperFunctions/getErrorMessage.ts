export function getErrorMessage(error: any) {
  return (
    error.response?.data?.error || error.message || "Unknown error occurred"
  );
}
