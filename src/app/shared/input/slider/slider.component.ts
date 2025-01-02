// <div class="grid">
//   <div class="col flex align-items-start">
//     <i
//       *ngIf="!!iconClass"
//       [attr.class]="iconClass"
//       [attr.style]="iconStyle"
//     ></i>
//     <svg
//       *ngIf="!!iconSvg"
//       [attr.class]="iconSvgClass"
//       role="img"
//       viewBox="0 0 20 20"
//     >
//       <use [attr.href]="iconSvgPath"></use>
//     </svg>
//     <svg *ngIf="customIconName=='person'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" x="0" y="0" viewBox="0 0 25 25" style="margin-right:10px" xml:space="preserve">
//       <g>
//         <g data-name="Layer 14">
//           <circle cx="12.5" cy="7" r="5" fill="#cccccc" opacity="1" data-original="#000000"/>
//           <path d="M13.56 13h-2.12A9.47 9.47 0 0 0 2 22.5a.5.5 0 0 0 .5.5h20a.55.55 0 0 0 .5-.56A9.46 9.46 0 0 0 13.56 13z" fill="#cccccc" opacity="1" data-original="#000000"/>
//         </g>
//       </g>
//     </svg>
//     <svg *ngIf="customIconName=='road'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" x="0" y="0" viewBox="0 0 42 58" style="margin-right:10px" xml:space="preserve" class="">
//       <g>
//         <g fill="#000" fill-rule="nonzero">
//           <path d="M12.37 29.23A50.737 50.737 0 0 0 10 44.47V57c.002.552.448.998 1 1h10a1.003 1.003 0 0 0 1-1V45.53a43.169 43.169 0 0 1 8.46-25.95c.24-.33.49-.64.73-.95l4.6 4.55a1.003 1.003 0 0 0 1.69-.52L41.67 1.2A1.008 1.008 0 0 0 40.49.02L19.06 4.41a.998.998 0 0 0-.5 1.69l4.04 4A54.99 54.99 0 0 0 16 20.26a58.929 58.929 0 0 0-3.63 8.97zM8.53 37.19a53.4 53.4 0 0 1 1.93-8.56 61.37 61.37 0 0 1 3.75-9.27c.21-.42.43-.83.64-1.24A57.55 57.55 0 0 0 10 10.97a1 1 0 0 0-1.49-.08L.3 17.73A.976.976 0 0 0 .18 19a78.62 78.62 0 0 1 8.35 18.19z" fill="#cccccc" opacity="1" data-original="#000000"/>
//         </g>
//       </g>
//     </svg>
   


//     <span style="width: 100%; margin-right: 10px;"[ngClass]="{'slider-inline-labels': inlineRangeLabels}">
//       <label *ngIf="!rangeDescription" htmlFor="input">{{ label }}<span *ngIf="isPreviewVisible">: {{value}}</span></label>


//       <div *ngIf="rangeDescription && range" class="slider-range-description">
//         <span class="lm-txt-color-light-grey">{{rangeDescriptionStartText ?? ''}}</span>
//         <span>{{rangeDescriptionStartValue ?? ''}}</span>
//         <span class="lm-txt-color-light-grey">{{rangeDescriptionSeparator ?? '-'}}</span>
//         <span class="lm-txt-color-light-grey">{{rangeDescriptionEndText ?? ''}}</span>
//         <span>{{rangeDescriptionEndValue ?? ''}}</span>
//       </div>


//       <p-slider
//         [(ngModel)]="value"
//         inputId="slider"
//         [attr.disabled]="disabled ? 'disabled' : null"
//         [min]="min"
//         [max]="max"
//         [step]="step"customIconName
//         [range]="range"
//         (onSlideEnd)="slideEnd($event)"
//         (onChange)="onSlideChange($event)"
//       >
//       </p-slider>
//       <label *ngIf="startText" class="slider-bottom-labels start-slider">{{startText}}</label>
//       <label *ngIf="endText" class="slider-bottom-labels end-slider">{{endText}}</label>


//     </span>
//   </div>
// </div>


// <div class="lm-input-desc">{{ description }}</div>




// //remove when material css is removed
// :host ::ng-deep {


//     i.pi {
//         width: 30px;
//         font-size: 20px;
//         color: #ccc;


//     }


//     label {
//         font-size: .87rem;
//         color: #9e9e9e !important;
//     }


//     input {


//         &:focus,
//         &.ng-invalid,
//         &.ng-valid {
//             box-shadow: none !important
//         }


//         &.ng-pristine {
//             border: none
//         }
//     }


//     .p-slider.p-slider-horizontal {
//         margin-top: 20px;
//     }


//     .p-slider .p-slider-range {
//         background: #00aeba;
//     }


//     .p-slider .p-slider-handle {
//         border-color: #00aeba;
//     }


//     .p-slider .p-slider-handle:focus {
//         box-shadow: 0 0 0 1px #9dd5f3;
//     }


//     .p-slider:not(.p-disabled) .p-slider-handle:hover {
//         background: #00aeba;
//         border-color: #00aeba;
//     }


//     .slider-bottom-labels {
//         padding-top: 5px;
//     }


//     .end-slider {
//         float: right;
//     }


//     .slider-inline-labels{
//         position: relative;
//         padding-left: 45px;
//         padding-right: 45px;


//         .slider-range-description{
//             position: absolute;
//             left:0;
//             right: auto;
//             top:-4px;
//             bottom: auto;
//             width: 100%;
//             height: 30px;
//             text-align: center;
//             font-size: .9rem;
//             color: #666;
//         }


//         .slider-bottom-labels{
//             position: absolute;
//             padding-top: 13px;
//             color: #d3d3d3 !important;


//             &.start-slider{
//                 left:0;
//                 right: auto;
//                 top:0;
//                 bottom: auto;
//             }
//             &.end-slider{
//                 left:auto;
//                 right: 0;
//                 top:0;
//                 bottom: auto;
//             }
//         }
//     }
// }
// import { CommonModule } from "@angular/common";
// import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, HostBinding, Injector, Input, NgModule, OnDestroy, OnInit, ViewChild,
// } from "@angular/core";
// import { FormsModule, NG_VALUE_ACCESSOR, NgModel, ReactiveFormsModule } from "@angular/forms";
// import { SliderModule } from "primeng/slider";
// import { LmInputBase } from "../input-base";
// import { LmTextIconStyle } from "@app/model/icons-model";


// const VALUE_ACCESSOR = {
//   provide: NG_VALUE_ACCESSOR,
//   useExisting: forwardRef(() => LmSliderComponent),
//   multi: true,
// };
// const LM_INPUT_BASE = {
//   provide: LmInputBase,
//   useExisting: forwardRef(() => LmSliderComponent),
// };


// @Component({
//   selector: "lm-slider",
//   templateUrl: "./slider.component.html",
//   styleUrls: ["./slider.component.scss"],
//   providers: [VALUE_ACCESSOR, LM_INPUT_BASE],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class LmSliderComponent extends LmInputBase implements OnInit, AfterViewInit, OnDestroy{
//   static nextId = 0;
//   searchType = "string";


//   @HostBinding() id = `lm-slider-${LmSliderComponent.nextId++}`;


//   @ViewChild(NgModel) model: NgModel;


//   @Input() tooltip?: string;
//   @Input() tooltipEvent = "focus";
//   @Input() tooltipPosition = "top";
//   @Input() startText = "";
//   @Input() endText = "";
//   @Input() isPreviewVisible = false;
//   @Input() iconClass = "";
//   @Input() iconSvgClass = "";
//   @Input() iconSvg?: string;
//   @Input() iconSize?: string;
//   @Input() iconColor?: string;
//   @Input() inputId?: string;
//   @Input() ariaLabelledBy?: string;
//   @Input() ariaLabel?: string;
//   @Input() style?: object;
//   @Input() styleClass?: string;
//   @Input() labelStyleClass?: string;
//   @Input() animate = false;
//   @Input() min = 0;
//   @Input() max = 100;
//   @Input() orientation = "horizontal";
//   @Input() customIconName = "";
//   @Input() step = 1;
//   @Input() range = false;
//   @Input() inlineRangeLabels;


//   @Input() rangeDescription;
//   @Input() rangeDescriptionStartText;
//   @Input() rangeDescriptionStartValue;
//   @Input() rangeDescriptionSeparator;
//   @Input() rangeDescriptionEndText;
//   @Input() rangeDescriptionEndValue;


//   @Input() slideEnd: (e) => number | number[];
//   @Input() slideChange: (e) => void | unknown;


//   iconStyle: LmTextIconStyle;
//   iconSvgPath: string;
//   private svgsPath = "assets/icons/icons.svg#";


//   constructor(injector: Injector) {
//     super(injector);


//     this.iconStyle = {
//       "font-size": this.iconSize || "1.4rem",
//       color: this.iconColor || "#d3d3d3",
//     };
//   }


//   onSlideEnd(e){
//     if(this.slideEnd) this.slideEnd(e)
//   }


//   onSlideChange(e){
//     if(this.slideChange) this.slideChange(e)
//   }


//   ngOnInit(): void {
//     super.ngOnInit();
//     if (this.iconSvg) this.iconSvgPath = this.svgsPath + this.iconSvg;
//   }


//   ngAfterViewInit(): void {
//     super.ngAfterViewInit();
//   }


//   ngOnDestroy(): void {
//     super.ngOnDestroy();
//   }
// }


// @NgModule({
//   imports: [CommonModule, FormsModule, ReactiveFormsModule, SliderModule],
//   exports: [LmSliderComponent],
//   declarations: [LmSliderComponent],
// })
// export class LMSliderModule {}





