import { FilterMatchMode as flm, PrimeNGConfig } from "primeng/api";

export const p_zIndex:PrimeNGConfig = {
     modal: 1100,    // dialog, sidebar
     overlay: 1000,  // dropdown, overlaypanel
     menu: 1000,     // overlay menus
     tooltip: 1100   // tooltip
} as any

export const p_filterOptions = {
     text: [flm.STARTS_WITH, flm.CONTAINS, flm.NOT_CONTAINS, flm.ENDS_WITH, flm.EQUALS, flm.NOT_EQUALS],
     numeric: [flm.EQUALS, flm.NOT_EQUALS, flm.LESS_THAN, flm.LESS_THAN_OR_EQUAL_TO, flm.GREATER_THAN, flm.GREATER_THAN_OR_EQUAL_TO],
     date: [flm.DATE_IS, flm.DATE_IS_NOT, flm.DATE_BEFORE, flm.DATE_AFTER]
 };

 export type p_filterMatchMode = "endsWith" | "startsWith" | "contains" | "equals" | "notEquals" | "in" | "lt" | "lte" | "gt" | "gte";