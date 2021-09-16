import { ObjectId } from "bson";

class Task {
  constructor({
    room_type,
    name,
    roomprice,
    max_person,
    hour_duration,
    extra_person_charge,
    partition,
    status = Task.STATUS_OPEN,
    id = new ObjectId(),
    rate_mode,
    vacant,
    occupied,
    promo_price_hour,
    roomprice_hour,
    duration_mode,
    promo_duration,
    img,
    temp_id,
    extension,
  }) {
    this._partition = partition;
    this._id = id;
    this.roomprice = roomprice;
    this.max_person = max_person;
    this.hour_duration = hour_duration;
    this.extra_person_charge = extra_person_charge;
    this.room_type = room_type;
    this.name = name;
    this.status = status;
    this.rate_mode = rate_mode;
    this.vacant = vacant;
    this.occupied = occupied;
    this.promo_price_hour = promo_price_hour;
    this.roomprice_hour = roomprice_hour;
    this.duration_mode = duration_mode;
    this.promo_duration = promo_duration;
    this.img = img;
    this.temp_id = temp_id;
    this.extension = extension;
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "Task",
    properties: {
      _id: "objectId",
      _partition: "string?",
      name: "string",
      room_type: "string",
      max_person: "string",
      hour_duration: "string",
      extra_person_charge: "string",
      extension: "string",
      roomprice: "string",
      status: "string",
      rate_mode: "string",
      vacant: "int",
      occupied: "int",
      promo_price_hour: "string",
      roomprice_hour: "string",
      duration_mode: "string",
      promo_duration: "string",
      img: "string",
      temp_id: "string"
    },
    primaryKey: "_id",
  };
}


class Room {

  constructor({
    floor,
    name,
    room_type_id,
    partition,
    status = Room.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.floor = floor;
    this.room_type_id = room_type_id;
    this.name = name;
    this.status = status;
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "Rooms",
    properties: {
      _id: "objectId",
      _partition: "string?",
      floor: "string",
      name: "string",
      room_type_id: "array",
      status: "string",
    },
    primaryKey: "_id",
  };
}



class Good {

  constructor({
    price,
    name,
    product,
    partition,
    quantity,
    status = Room.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.price = price;
    this.product = product;
    this.name = name;
    this.quantity = quantity;
    this.status = status;
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "Goods",
    properties: {
      _id: "objectId",
      _partition: "string?",
      price: "int",
      name: "string",
      product: "string",
      quantity: "int",
      status: "string",
    },
    primaryKey: "_id",
  };
}



class Checkin {
 
  constructor({
    control_num,
    address,
    chatroom,
    check_in,
    check_out,
    partition,
    check_out_w_ext,
    company,
    contact,
    discount,
    customer,
    email,
    extension,
    discount_value,
    discount_code,
    extension_amount,
    extension_mode,
    extension_person,
    extension_price,
    extension_rate,
    extension_value,
    extra_person,
    floor,
    hour_duration,
    hour_key,
    hour_price,
    hour_rate,
    max,
    nationality,
    no_person,
    no_person_discount,
    note,
    number_of_days,
    number_of_hours,
    payment,
    payment_method,
    penalty,
    penalty_description,
    penalty_val,
    price,
    room_no,
    room_no_id,
    room_type,
    room_type_id,
    tax,
    total_addtional,
    updated_at,
    extra_amount,
    room_no_id_temp,
    res_code,
    checkin_stat,
    Change_room,
    refund,
    temp_id,
    first_checkout,
    status = Room.STATUS_OPEN,
    id = new ObjectId(),
    voucher_code,
voucher_exp,
voucher_mode,
voucher_value,
RefReason,
  }) {
    this.first_checkout = first_checkout;
    this._partition = partition;
    this._id = id;
    this.address = address;
    this.check_in = check_in;
    this.check_out = check_out;
    this.check_out_w_ext = check_out_w_ext;
    this.company = company;
    this.contact = contact;
    this.customer = customer;
    this.discount = discount;
    this.discount_code = discount_code;
    this.discount_value = discount_value;
    this.email = email;
    this.extension = extension;
    this.extension_amount = extension_amount;
    this.extension_mode = extension_mode;
    this.extension_person = extension_person;
    this.extension_price = extension_price;
    this.extension_rate = extension_rate;
    this.extension_value = extension_value;
    this.extra_person = extra_person;
    this.floor = floor;
    this.hour_duration = hour_duration;
    this.hour_key = hour_key;
    this.hour_price = hour_price;
    this.hour_rate = hour_rate;
    this.max = max;
    this.nationality = nationality;
    this.no_person = no_person;
    this.no_person_discount = no_person_discount;
    this.note = note;
    this.number_of_days = number_of_days;
    this.number_of_hours = number_of_hours;
    this.payment = payment;
    this.payment_method = payment_method;
    this.penalty = penalty;
    this.penalty_description = penalty_description;
    this.penalty_val = penalty_val;
    this.price = price;
    this.room_no = room_no;
    this.room_no_id = room_no_id;
    this.room_type = room_type;
    this.room_type_id = room_type_id;
    this.tax = tax;
    this.status = status;
    this.total_addtional = total_addtional;
    this.updated_at = updated_at;
    this.extra_amount = extra_amount;
    this.control_num = control_num;
    this.room_no_id_temp = room_no_id_temp;
    this.checkin_stat = checkin_stat;
    this.res_code = res_code;
    this.Change_room= Change_room;
    this.refund = refund;
    this.temp_id=temp_id;
    this.chatroom=chatroom;
    this.voucher_code=voucher_code;
    this.voucher_exp=voucher_exp;
    this.voucher_mode=voucher_mode;
    this.voucher_value=voucher_value;
    this.RefReason = RefReason;

  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "Checkin",
    properties: {
      _id: "objectId",
      _partition: "string?",
      temp_id: "string",
      first_checkout:"string",
      control_num: "string",
      address: "string",
      chatroom: "string",
      check_out: "int",
      check_in: "int",
      check_out_w_ext: "int",
      company: "string",
      contact: "string",
      customer: "string",
      discount: "string",
      discount_code: "string",
      discount_value: "string",
      email: "string",
      extension: "string",
      extension_amount: "string",
      extension_mode: "string",
      extension_person: "string",
      extension_price: "string",
      extension_rate: "string",
      extension_value: "string",
      extra_person: "string",
      extra_amount: "string",
      hour_duration: "string",
      hour_key: "string",
      hour_price: "string",
      hour_rate: "string",
      max: "string",
      nationality: "string",
      no_person: "int",
      no_person_discount: "string",
      note: "string",
      number_of_days: "string",
      number_of_hours: "string",
      payment: "int",
      payment_method: "string",
      penalty: "string",
      penalty_description: "string",
      penalty_val: "string",
      price: "string",
      room_no: "string",
      room_no_id: "string",
      room_type: "string",
      room_type_id: "string",
      status: "string",
      tax: "string",
      total_addtional: "int",
      updated_at: "string",
      room_no_id_temp: "string",
      res_code: "string",
      checkin_stat: "string",
      Change_room: "string",
      refund: "string",
      voucher_code: "string",
      voucher_exp: "int",
      voucher_mode:  "string",
      voucher_value:  "string",
      RefReason:  "string",

    },
    primaryKey: "_id",
  };
}




class Orders {

  constructor({
    item,
    itemid,
    price,
    customer_id,
    customer,
       room,
    partition,
    quantity,
    staff,
    updated_at,
    pay,
    method,
    status = Room.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.item = item;
    this.itemid = itemid;
    this.price = price;
    this.quantity = quantity;
    this.staff = staff;
    this.status = status;
    this.customer= customer;
    this.customer_id= customer_id;
    this.room= room;
    this.updated_at= updated_at;
    this.pay = pay;
    this.method = method;
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "Orders",
    properties: {
      _id: "objectId",
      _partition: "string?",
      item: "string",
      itemid: "string",
      staff: "int",
      price: "int",
      quantity: "int",
      updated_at: "int",
      status: "string",
      customer_id: "string",
      customer: "string",
       room: "string",
       pay: "int",
       method: "string",
    },
    primaryKey: "itemid",
  };
}


class Carts {

  constructor({
    item,
    itemid,
    price,
    customer_id,
    customer,
       room,
    partition,
    quantity,
    staff,
    updated_at,
    status = Room.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.item = item;
    this.itemid = itemid;
    this.price = price;
    this.quantity = quantity;
    this.staff = staff;
    this.status = status;
    this.customer= customer;
    this.customer_id= customer_id;
    this.room= room;
    this.updated_at= updated_at;
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "Carts",
    properties: {
      _id: "objectId",
      _partition: "string?",
      item: "string",
      itemid: "string",
      staff: "int",
      price: "int",
      quantity: "int",
      updated_at: "int",
      status: "string",
      customer_id: "string",
      customer: "string",
       room: "string",
    },
    primaryKey: "itemid",
  };
}


class Checkout {

  constructor({
    first_checkout,
    control_num,
    address,
    check_in_date,//
    check_out_date,//
    check_out_id,//
    check_in,
    check_out,
    partition,
    check_out_w_ext,
    company,
    contact,
    discount,
    customer,
    email,
    extension,
    discount_value,
    discount_code,
    discount_less,//
    extension_amount,
    extension_mode,
    extension_person,
    extension_price,
    extension_rate,
    extension_total_amount,//
    extension_value,
    extra_person,
    floor,
    hour_duration,
    hour_key,
    hour_price,
    hour_rate,
    nationality,
    no_person,
    no_person_discount,
    note,
    number_of_days,
    number_of_hours,
    overall_total,//
    payment,
    payment_method,
    penalty,
    penalty_description,
    penalty_val,
    price,
    room_no,
    room_no_id,
    room_type,
    stay_total,//
    subtotal,//
    tax,
    tax_val,//
    total_addtional,//
    updated_at,
    extra_amount,
    res_code,
    checkin_stat,
    Change_room,
    refund,
    temp_id,
    status = Room.STATUS_OPEN,
    id = new ObjectId(),

voucher_code,
voucher_exp,
voucher_mode,
voucher_value,
room_change,
  }) {
    this.first_checkout = first_checkout;
    this.temp_id=temp_id,
    this.extra_amount=extra_amount,
    this._partition = partition;
    this._id = id;
    this.address = address;
    this.control_num = control_num;
    this.check_in = check_in;
    this.stay_total = stay_total;
    this.tax_val = tax_val;
    this.subtotal = subtotal;
    this.discount_less = discount_less;
    this.check_out_id = check_out_id;
    this.check_out_date = check_out_date;
    this.overall_total = overall_total;
    this.extension_total_amount = extension_total_amount;
    this.check_in_date = check_in_date;
    this.check_out = check_out;
    this.check_out_w_ext = check_out_w_ext;
    this.company = company;
    this.contact = contact;
    this.customer = customer;
    this.discount = discount;
    this.discount_code = discount_code;
    this.discount_value = discount_value;
    this.email = email;
    this.extension = extension;
    this.extension_amount = extension_amount;
    this.extension_mode = extension_mode;
    this.extension_person = extension_person;
    this.extension_price = extension_price;
    this.extension_rate = extension_rate;
    this.extension_value = extension_value;
    this.extra_person = extra_person;
    this.floor = floor;
    this.hour_duration = hour_duration;
    this.hour_key = hour_key;
    this.hour_price = hour_price;
    this.hour_rate = hour_rate;
    this.nationality = nationality;
    this.no_person = no_person;
    this.no_person_discount = no_person_discount;
    this.note = note;
    this.number_of_days = number_of_days;
    this.number_of_hours = number_of_hours;
    this.payment = payment;
    this.payment_method = payment_method;
    this.penalty = penalty;
    this.penalty_description = penalty_description;
    this.penalty_val = penalty_val;
    this.price = price;
    this.room_no = room_no;
    this.room_no_id = room_no_id;
    this.room_type = room_type;
    this.tax = tax;
    this.status = status;
    this.total_addtional = total_addtional;
    this.updated_at = updated_at;
    this.checkin_stat = checkin_stat;
    this.res_code = res_code;
    this.Change_room = Change_room;
    this.refund = refund;
    this.voucher_code=voucher_code;
    this.voucher_exp=voucher_exp;
    this.voucher_mode=voucher_mode;
    this.voucher_value=voucher_value;
    this.room_change = room_change;
    
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "Checkout",
    properties: {
      first_checkout:"string",
      control_num:"string" ,//
      temp_is:"string",
      check_in_date:"string" ,//
      check_out_date:"string" ,//
      check_out_id: "string",//
      discount_less: "string",//
      extension_total_amount: "string",//
      overall_total: "int",//
      stay_total: "string",//
      subtotal: "string",//
      tax_val: "string",//q
      _id: "objectId",
      _partition: "string?",
      address: "string",
      chatroom: "string",
      check_out: "int",
      check_in: "int",
      check_out_w_ext: "string",
      company: "string",
      contact: "string",
      customer: "string",
      discount: "string",
      discount_code: "string",
      discount_value: "string",
      email: "string",
      extension: "int",
      extension_amount: "string",
      extension_mode: "string",
      extension_person: "string",
      extension_price: "string",
      extension_rate: "string",
      extension_value: "string",
      extra_person: "string",
      extra_amount: "string",
      hour_duration: "string",
      hour_key: "string",
      hour_price: "string",
      hour_rate: "string",
      nationality: "string",
      no_person: "int",
      no_person_discount: "string",
      note: "string",
      number_of_days: "string",
      number_of_hours: "string",
      payment: "int",
      payment_method: "string",
      penalty: "string",
      penalty_description: "string",
      penalty_val: "string",
      price: "string",
      room_no: "string",
      room_no_id: "string",
      room_type: "string",
      room_type_id: "string",
      status: "string",
      tax: "string",
      total_addtional: "int",
      updated_at: "string",
      res_code: "string",
      checkin_stat: "string",
      Change_room: "string",
      refund: "string",
      voucher_code: "string",
      voucher_exp: "int",
      voucher_mode:  "string",
      voucher_value:  "string",
      room_change: "string",

    },
    primaryKey: "_id",
  };
}



class Booking_Reservation {

  constructor({

    voucher_code,
    voucher_min,
    voucher_max,
    voucher_exp,
    voucher_details,
    voucher_mode,
    voucher_value,
    roomprice,
    promo_price_hour,
    roomprice_hour,
    hour_duration,
    duration_mode,
    rate_mode,

    name,
    email,
    phone_no,
    room,
    address,
    nationality,
    mode,
    reservation_code,
    in_check,
    out_check,
    guest,
    createdAt,
    updatedAt,
    __v,
    partition,
    reason,
    status = Room.STATUS_OPEN,
    id = new ObjectId(),
  }) {
   
    this.voucher_code = voucher_code;
    this.voucher_min = voucher_min;
    this.voucher_max = voucher_max;
    this.voucher_exp = voucher_exp;
    this.voucher_details = voucher_details;
    this.voucher_mode = voucher_mode;
    this.voucher_value = voucher_value;
    this.roomprice = roomprice;
    this.promo_price_hour = promo_price_hour;
    this.roomprice_hour = roomprice_hour;
    this.hour_duration = hour_duration;
    this.duration_mode = duration_mode;
    this.rate_mode = rate_mode;

    this._partition = partition;
    this._id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.nationality = nationality;
    this.mode = mode;
    this.reservation_code = reservation_code;
    this.in_check = in_check;
    this.out_check = out_check;
    this.guest = guest;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.__v = __v;
    this.phone_no = phone_no;
    this.status = status;
    this.room= room;
    this.reason= reason;
  }

  static STATUS_OPEN = "For Reservation";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "Booking_Reservation",
    properties: {
      _id: "objectId",
      _partition: "string?",
      name: "string",
      email: "string",
      phone_no: "string",
      address: "string",
      nationality: "string",
      mode: "string",
      reservation_code: "string",
      in_check: "int",
      out_check: "int",
      guest: "string",
      createdAt: "int",
      updatedAt: "int",
      __v: "int",
      status: "string",
      room: "string",
      reason: "string",

      voucher_code: "string",
      voucher_min: "int",
      voucher_max: "int",
      voucher_exp: "int",
      voucher_details: "string",
      voucher_mode: "string",
      voucher_value: "string",
      roomprice: "string",
      promo_price_hour: "string",
      roomprice_hour: "string",
      hour_duration: "string",
      duration_mode: "string",
      rate_mode: "string",

    },
    primaryKey: "_id",
  };
}


class Logs {

  constructor({
    date,
    description,
    staff,
    partition,
    status = Room.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.date = date;
    this.description = description;
    this.staff = staff;
    this.status = status;
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "logs",
    properties: {
      _id: "objectId",
      _partition: "string?",
      date: "int",
      description: "string",
      staff: "string",
      status: "string",
    },
    primaryKey: "_id",
  };
}


class Room_checklist {

  constructor({
    date,
    room_id,
    staff,
    note,
    partition,
    checkList,
    checkListPros,
    status = Room.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.date = date;
    this.checkList = checkList;
    this.checkListPros = checkListPros;
    this.room_id = room_id;
    this.staff = staff;
    this.note = note;
    this.status = status;
  }

  static STATUS_OPEN = "Available";
  static STATUS_IN_PROGRESS = "Cleaning";
  static STATUS_COMPLETE = "Under Maintenance";
  static schema = {
    name: "room_checklist",
    properties: {
      _id: "objectId",
      _partition: "string?",
      date: "int",
      room_id: "string",
      note: "string",
      staff: "string",
      status: "string",
      checkListPros: "array",
      checkList: "array",
    },
    primaryKey: "_id",
  };
}

export { Task,Room, Good, Checkin, Carts, Orders, Checkout, Booking_Reservation , Logs, Room_checklist};
