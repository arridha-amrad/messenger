import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export default class SocketListeningCallback {
  constructor(private dispatch: Dispatch<UnknownAction>) {}
}
