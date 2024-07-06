import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MockInterceptor } from "./interceptors";

const INTERCEPTORS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MockInterceptor,
    multi: true
  },
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: AuthInterceptor,
  //   multi: true
  // },
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: ErrorInterceptor,
  //   multi: true
  // },
]

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ...INTERCEPTORS
  ]
})
export class CoreModule {}