export const actionType = action => ({
  ACTION: action,
  HANDLED: `${action}_HANDLED`,
  PENDING: `${action}_PENDING`,
  SUCCESS: `${action}_SUCCESS`,
  FAILED: `${action}_FAILED`,
});
