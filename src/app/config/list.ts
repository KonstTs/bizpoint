import { ktListOptions } from "../shared/structure/list/list-viewmodel.service";

export const ktBaseListOptions:ktListOptions = {
    groupBy: 'date',
    orderBy: 'descending',
    atPage: ['0',0],
    pageSize: 100,
    layoutMode: 'row'
}