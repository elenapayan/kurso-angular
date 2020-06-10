import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ErrorMessagesComponent } from './error-messages/error-messages.component';


@NgModule({
    declarations: [
        ErrorMessagesComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        ErrorMessagesComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule { }
