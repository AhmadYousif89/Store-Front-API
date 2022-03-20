"use strict";
// import { DisplayProcessor, SpecReporter, StacktraceOption } from "jasmine-spec-reporter";
// import SuiteInfo = jasmine.JasmineStartedInfo;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// class CustomProcessor extends DisplayProcessor {
//   public displayJasmineStarted(info: SuiteInfo, log: string): string {
//     return `${log}`;
//   }
// }
// jasmine.getEnv().clearReporters();
// jasmine.getEnv().addReporter(
//   new SpecReporter({
//     spec: {
//       displayStacktrace: StacktraceOption.NONE,
//     },
//     customProcessors: [CustomProcessor],
//   })
// );
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
process.env.ENV = "test";
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter({
    suite: {
        displayNumber: true,
    },
    spec: {
        displayPending: true,
        displayDuration: false,
        displayErrorMessages: true,
    },
    summary: {
        displayDuration: true,
        displayFailed: true,
        displaySuccessful: false,
        displayPending: true,
        displayErrorMessages: true,
    },
}));
