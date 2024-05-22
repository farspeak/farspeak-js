interface IFarspeakError {
  farspeakErrorMessage: string;
}

export class FarspeakError extends Error implements IFarspeakError {
  farspeakErrorMessage: string;
  constructor(message: string) {
    super(message);
    this.farspeakErrorMessage = message;
  }
}

export const FARSPEAK_ERROR = {
  no_direct_chain: "Can't call `write` method without defining an entity",
  invalid_payload: "Entity payload must be array of objects",
  no_inquiry: "Inquiry is missing",
  must_have_id: "ID is missing",
  must_have_body: "Body is missing",
};
