// import { DisplayProcessor, SpecReporter, StacktraceOption } from "jasmine-spec-reporter";
// import SuiteInfo = jasmine.JasmineStartedInfo;

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

import { SpecReporter } from "jasmine-spec-reporter";
import dotenv from "dotenv";
dotenv.config();
process.env.ENV = "test";
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
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
  })
);
