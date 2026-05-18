import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'lapangan.index': { paramsTuple?: []; params?: {} }
    'lapangan.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'lapangan.booking_success': { paramsTuple?: []; params?: {} }
    'lapangan.my_bookings': { paramsTuple?: []; params?: {} }
    'lapangan.booking_form': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'lapangan.booking_store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.login_form': { paramsTuple?: []; params?: {} }
    'admin.login': { paramsTuple?: []; params?: {} }
    'admin.logout': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.lapangan_index': { paramsTuple?: []; params?: {} }
    'admin.lapangan_create': { paramsTuple?: []; params?: {} }
    'admin.lapangan_store': { paramsTuple?: []; params?: {} }
    'admin.lapangan_edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.lapangan_update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.lapangan_delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.bookings_index': { paramsTuple?: []; params?: {} }
    'admin.booking_update_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'lapangan.index': { paramsTuple?: []; params?: {} }
    'lapangan.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'lapangan.booking_success': { paramsTuple?: []; params?: {} }
    'lapangan.my_bookings': { paramsTuple?: []; params?: {} }
    'lapangan.booking_form': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.login_form': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.lapangan_index': { paramsTuple?: []; params?: {} }
    'admin.lapangan_create': { paramsTuple?: []; params?: {} }
    'admin.lapangan_edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.bookings_index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'lapangan.index': { paramsTuple?: []; params?: {} }
    'lapangan.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'lapangan.booking_success': { paramsTuple?: []; params?: {} }
    'lapangan.my_bookings': { paramsTuple?: []; params?: {} }
    'lapangan.booking_form': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.login_form': { paramsTuple?: []; params?: {} }
    'admin.dashboard': { paramsTuple?: []; params?: {} }
    'admin.lapangan_index': { paramsTuple?: []; params?: {} }
    'admin.lapangan_create': { paramsTuple?: []; params?: {} }
    'admin.lapangan_edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.bookings_index': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'lapangan.booking_store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.login': { paramsTuple?: []; params?: {} }
    'admin.logout': { paramsTuple?: []; params?: {} }
    'admin.lapangan_store': { paramsTuple?: []; params?: {} }
    'admin.lapangan_update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.lapangan_delete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'admin.booking_update_status': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}