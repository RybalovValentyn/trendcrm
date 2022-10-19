filter_status = 0;
count_filter = 0;
fields_filter =[];

var operators = {
  "063": "lifecell",
  "093": "lifecell",
  "073": "lifecell",
  "050": "vodafone",
  "066": "vodafone",
  "095": "vodafone",
  "099": "vodafone",
  "039": "kievstar",
  "067": "kievstar",
  "068": "kievstar",
  "096": "kievstar",
  "097": "kievstar",
  "098": "kievstar",
};
var table;

var test;
var statuses_tabs;
var app

var lang = getTranslated()

$(document).ready(function () {
  app = Sammy.apps.body;
  let date = new Date();

  if(context.data.columns?.length > 0)
  {
    $('#orders_table thead tr').each((e, tr) => {
      $(tr).find('th').each((i, th) => {
        if(!context.data.columns.includes(String(i))) {
          $(th).remove()
        }
      })
    })
  }

  statuses_tabs = $("div#statuses").scrollTabs({
    click_callback: function (e) {
      if($(this).hasClass('add-status')) {
        ModalCreateStatus.render(this)
        return
      }
      
      filter_status = $(this).attr("order_status_id");
      let data = context.data
      history.pushState({}, null, "/#/orders?status=" + filter_status);
      $("#nav_orders").attr("href", app.getLocation());

      updateStatusTab(statuses_tabs, filter_status)
      table.ajax.reload();
      saveordersfilters();
     
      setTimeout(function(){
        if(typeof context.data == 'undefined') {
          context['data'] = data
        }
      }, 1000)
    },
  });

  $('[name="date_sent"]').datepicker({
    format: "yyyy-mm-dd",
    todayBtn: "linked",
    clearBtn: true,
    language: $.cookie('user.lang'),
    autoclose: true,
    todayHighlight: true
  });

  $('[name="create_date_from"], [name="create_date_to"]').datepicker({
    language: $.cookie('user.lang'),
    todayHighlight: true,
    format: "yyyy-mm-dd",
    autoclose: true,
    clearBtn: true,
  });

  $('[name="update_date_from"], [name="update_date_to"]').datepicker({
    language: $.cookie('user.lang'),
    todayHighlight: true,
    format: "yyyy-mm-dd",
    autoclose: true,
    clearBtn: true,
  });

  $('[name="datetime_sent_from"], [name="datetime_sent_to"]').datepicker({
    language: $.cookie('user.lang'),
    todayHighlight: true,
    format: "yyyy-mm-dd",
    autoclose: true,
    clearBtn: true,
  });

  $('[name="time_sent"]').clockpicker({
    default: 'now',
    autoclose: true
  });

  var elems = document.querySelectorAll('.switchery');

  elems.forEach(function(html) {
    var switchery = new Switchery(html, {color: '#ffb200'});

    $(html).on("change", function (){
      if ($(this).prop("checked")){
        date = new Date()
        $('[name="date_sent"]').removeAttr('disabled').datepicker("setDate", date)
        $('[name="time_sent"]').removeAttr('disabled').val(date.toLocaleTimeString());
      } else {
        $('[name="date_sent"], [name="time_sent"]')
          .attr('disabled', true)
          .val('')
      }
    })
  });

  $("body")
    .off("change", '[name="reload_auto"]')
    .on("change", '[name="reload_auto"]', function (event) {
      
      if ($(this).is(":checked")) {

        timer.start(function () {
          updateStatusTab(statuses_tabs, filter_status)
          table.ajax.reload();
        }, $("[name=reload_second]").val());

      } else {
        timer.stop()
      }
    });

  $("body")
    .off("change", '[name="reload_second"]')
    .on("change", '[name="reload_second"]', function (event) {
      var value = $(this).val();

      if (value !== "" && value.indexOf(".") === -1) {
        $(this).val(Math.max(Math.min(value, 9000), 1));
      }

      timer.set_interval($(this).val());
    });

  $("body")
    .off("click", "#reload_page")
    .on("click", "#reload_page", function (event) {
      table.ajax.reload();
      updateStatusTab(statuses_tabs, filter_status)
    });

  $(".styled").uniform();

  $(".bootstrap-select").selectpicker();

  $("#checkbox-status-block").hide();
  $("#checkbox-message-template-block").hide();

  $(".options").popover({
    html: true,
    content:
      '<button type="button" class="btn btn-link btn-xs"><i class="icon-comment-discussion position-left"></i> Mini size</button>',
    placement: "bottom",
    trigger: "click",
  });

  if (!$.cookie("user.create_ttn")) {
    $("#create_ttn_for_order").remove();
    $("#delete_ttn_for_order").remove();
    $("#return_ttn_for_order").remove();

    $("#j_modal_create_EN_for_order").remove();
    $("#j_delete_EN_for_order").remove();
    $("#j_return_EN_for_order").remove();
  }

  loadtfilters();

  var _orders_table_columns = [
    {
      data: "id",
    },
    {
      data: "status_name",
      class: "status",
      render: function (data, type, full, meta) {
        if (full.datetime == full.update_at) {
          return (
            '<span color="' +
            full.status_style +
            '" class="text-highlight blink" style="background-color: ' +
            full.status_style +
            '; color: #fff">' +
            data +
            "</span>"
          );
        } else {
          return (
            '<span color="' +
            full.status_style +
            '" class="text-highlight" style="background-color: ' +
            full.status_style +
            '; color: #fff">' +
            data +
            "</span>"
          );
        }
      },
    },
    {
      data: "client",
      render: function (data, type, full, meta) {
        if (full.doubl_client > 1 && full.order_datetime_min != full.datetime) {
          return data + '&nbsp;<span class="label bg-danger-400">'+lang.orders.text_22+'</span>';
        } else {
          return data;
        }
      },
    },
    {
      data: "client_phone",
      render: function (data, type, full, meta) {
        if (data) {
          if (full.banned_phone == "1") {
            return (
              '<span style="color: #ff0000;">' +
              '<i class="out icon-user-block mr-5"></i>' +
              ($.cookie("user.show_phone_number") == 1
                ? String(data).replace(
                    /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/,
                    "$1 ($2) $3-$4-$5"
                  )
                : String(data).replace(
                    /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/,
                    "$1 ($2) $3-**-**"
                  )) +
              "</span>" +
              (full.calls_count > 0
                ? ' <i class="out icon-phone2"></i>' + full.calls_count
                : "") +
              (full.sms_count > 0
                ? ' <i class="icon-mail5"></i>' + full.sms_count
                : "")
            );
          } else {
            return (
              "<tel>" +
              (operators[String(data.substr(2, 3))] == undefined
                ? '<i class="out icon-phone mr-5"></i>'
                : '<span class="out icon-operator" style="background: url(./tpl/image/' +
                  operators[String(data.substr(2, 3))] +
                  '.png); background-size: cover;"></span>') +
              ($.cookie("user.show_phone_number") == 1
                ? String(data).replace(
                    /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/,
                    "$1 ($2) $3-$4-$5"
                  )
                : String(data).replace(
                    /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/,
                    "$1 ($2) $3-**-**"
                  )) +
              "</tel>" +
              (full.calls_count > 0
                ? ' <i class="out icon-phone2"></i>' + full.calls_count
                : "") +
              (full.sms_count > 0
                ? ' <i class="icon-mail5"></i>' + full.sms_count
                : "")
            );
          }
        } else {
          return "";
        }
      },
    },
    {
      data: "client_groups"
    },
    {
      data: "ig_username",
      render: function (data, type, full, meta) {
        return data ? '<span class="ig_redirect"><img src="./images/instagram.png" style="width: 20px;"> '+data+'</span>' : ''
      }
    },
    {
      class: "comment",
      data: "comment",
      render: function (data, type, full, meta) {
        if (meta["row"] < 3)
          return (
            '<div flow="down" tooltip="' +
            data +
            '"><span style="display: block; text-overflow: ellipsis; overflow: hidden; width: 160px; white-space: nowrap; margin: 0;" order_id="' +
            full.id +
            '"><i class="icon-info22"></i> ' +
            data +
            "</span></div>"
          );
        else
          return (
            '<div flow="up" tooltip="' +
            data +
            '"><span style="display: block; text-overflow: ellipsis; overflow: hidden; width: 160px; white-space: nowrap; margin: 0;" order_id="' +
            full.id +
            '"><i class="icon-info22"></i> ' +
            data +
            "</span></div>"
          );
      },
    },
    {
      data: 'supplier'
    },
    {
      data: "total",
    },
    {
      data: "storage_income_price_sum",
    },
    {
      data: "products_names",
      render: function (data, type, full, meta) {
        if (!empty(data)) {
          let debt = !empty(full.system_action) ? ' ('+full.system_action+')' : ''

          if (meta["row"] < 3)
            return (
              '<div flow="down" tooltip="' +
              data.replace(/; /g, ";\n") +
              '"><span style="display: block; text-overflow: ellipsis; overflow: hidden; width: 160px; white-space: nowrap; margin: 0;"><span class="badge bg-orange-300">' +
              full.product_amount + debt +
              "</span> " +
              data +
              "</span></div>"
            );
          else
            return (
              '<div flow="up" tooltip="' +
              data.replace(/; /g, ";\n") +
              '"><span style="display: block; text-overflow: ellipsis; overflow: hidden; width: 160px; white-space: nowrap; margin: 0;"><span class="badge bg-orange-300">' +
              full.product_amount + debt +
              "</span> " +
              data +
              "</span></div>"
            );
        } else {
          return "";
        }
      },
    },
    {
      data: "responsible",
    },
    {
      data: "group_name",
    },
    {
      data: "counterparty",
      render: function(data, type, full, meta) {
        let a = ''
        if(full.delivery_type_id == 130) {
          a = full.j_name
        }

        if(full.delivery_type_id == 12) {
          a = full.counterparty
        }

        if(full.delivery_type_id == 13) {
          a = full.ukrposhta_account
        }

        return a
      }
    },
    {
      data: "delivery_type",
      render: function (data, type, full, meta) {
        if (!empty(data) && data != "") {
          if (full.delivery_type_id == 13) {
            return (
              '<font color="#2196F3"><b><center>' +
              data +
              "</center></b></font>"
            );
          } else if (full.delivery_type_id == 12) {
            return (
              '<font color="#dc3545"><b><center> Нова Пошта </center></b></font>'
            );
          } else if(full.delivery_type_id == 130) {
            return (
              '<font color="#304ffe"><b><center>' +
              data +
              "</center></b></font>"
            );
          } else {
            return '<font><b><center>' +
            data +
            "</center></b></font>"
          }
        } else {
          return "";
        }
      },
    },
    {
      class: "delivery_status",
      data: "ttn",
      render: function (data, type, full, meta) {
        if (
          !empty(full.ttn) &&
          full.ttn != null &&
          full.ttn_update_at != null
        ) {
          var update_at_limit = new Date();
          update_at_limit.setDate(update_at_limit.getDate() - 3);
          // update_at_limit = update_at_limit.toISOString().slice(0, 10);

          var ttn_update_at = new Date(full.ttn_update_at);
          // ttn_update_at = ttn_update_at.toISOString().slice(0, 10);

          if (
            ttn_update_at <= update_at_limit &&
            $.inArray(full.ttn_status_code, [11, 10, 102, 103, 108]) == "-1"
          ) {
            return (
              '<span class="text-danger"><i class="icon-info22" name="np_info"></i>' +
              data +
              "</span>"
            );
          }
        }

        if(!empty(full.j_number)) {
          return full.j_number
        }

        return data == "" || data == null
          ? ""
          : '<i class="icon-info22" name="np_info"></i>' + data;
      },
    },
    {
      data: "backward_delivery_summ",
    },
    {
      data: "ttn_cost",
      render: function(data, type, full, meta) {
          let a = ''
          
          if(full.delivery_type_id == 130) {
            a = full.j_ttn_cost
          }
  
          if(full.delivery_type_id == 12) {
            a = full.ttn_cost
          }
  
          if(full.delivery_type_id == 13) {
            a = full.barcode_cost
          }

          return a
      }
    },
    {
      data: "payment_name",
      render: function (data, type, full, meta) {
        if (full.payment_type == "16") {
          if (full.payment_status == "0") {
            return data + " ("+lang.orders.text_24+")"
          } else {
            return data + " ("+lang.orders.text_23+")"
          }
        } else {
          return data
        }
      }
    },
    {
      data: "ttn_status",
      render: function (data, type, full, meta) {
        let s = ''

        if (!empty(data) ?? full.delivery_type_id == 12) {
          if (
            data.search("Прибув у відділення") >= 0 ||
            data.search("Создана") >= 0 ||
            data.search("Принята") >= 0
          ) {
            return '<font color="#ba722e">' + data + "</font>";
          } else if (
            data.search("Відправлення отримано") >= 0 ||
            data.search("Доставлена") >= 0
          ) {
            return '<font color="#25902e">' + data + "</font>";
          } else if (
            data.search("Відмова від отримання") >= 0 ||
            data.search("Возврат") >= 0 ||
            data.search("Возвращена") >= 0
          ) {
            return '<font color="#f6272e">' + data + "</font>";
          } else {
            return data;
          }
        }
        
        if(full.delivery_type_id == 130){
          s = full.j_status
        }

        if(full.delivery_type_id == 13){
          s = full.barcode_status
        }

        return s;
      },
    },
    {
      data: "ttn_update_at",
      render: function (data, type, full, meta) {
        if (data != null) {

          let today = new Date();

          let ttn_update_at = new Date(data);

          let days = today.getDate() - ttn_update_at.getDate();
          let year = today.getFullYear() - ttn_update_at.getFullYear();
          let month = today.getMonth() - ttn_update_at.getMonth();

          if (month < 0){
            month += 12;
          } else if (month >= 0 && year > 0){
            if(days > 0){
              month += 12;
            } else {
              year += 1;
            }
          }

          if (days >= 0 && month > 0){
            month += 1;
          } else if (days < 0){
            days += 30;
          }
          days += month > 1 ? ((month - 1) * 30) : 0;
          days += year > 1 ? ((year - 1) * 365) : 0;

          if (days > 5) {
            return (
                '<span class="text-danger"> ' +
                days +
                "</span>"
            );
          } else {
            return days;
          }
        }

        return "";

      }
    },
    {
      data: "datetime",
    },
    {
      data: "update_at",
    },
    {
      data: "datetime_sent",
    },
    {
      data: "store_url",
      render: function (data, type, full, meta) {
        return '<a href="http://' + data + '" target="_blank">' + data + "</a>";
      },
    },
    {
      data: "name_store_resp",
    },
    {
      data: "store_title",
    },
    {
      data: "utm_source",
    },
    {
      data: "utm_medium",
    },
    {
      data: "utm_term",
    },
    {
      data: "utm_content",
    },
    {
      data: "utm_campaign",
    },
    {
      data: "marketing",
    },
    {
      class: "client_ip",
      data: "client_ip",
      render: function (data, type, full, meta) {
        if (full.banned_ip == "1")
          return (
            '<span style="color: #ff0000;" order_id="' +
            full.id +
            '"><i class="out icon-user-block position-left"></i>' +
            data +
            "</span>"
          );
        else return '<span order_id="' + full.id + '">' + data + "</span>";
      },
    },
  ];

  var orders_table_columns = []
  if(context.data.columns.length > 0) {
    _orders_table_columns.forEach((el, i) => {
      if(context.data.columns.includes(String(i)))
      {
        orders_table_columns.push(el)
      }
    })
  } else {
    orders_table_columns = _orders_table_columns
  }

  if ($.cookie("user.role") != "administrator") {
    for (i = 0; i < orders_table_columns.length; i++) {
      if (orders_table_columns[i].data == "storage_cost_sum") {
        orders_table_columns.splice(i, 1);
      }
    }
  }

  var status_delivery_list = [];

  if (!empty($.urlParam("status"))) {
    filter_status = $.urlParam("status");
  }

  if (location.hash.search("invoice_marketing") != -1) {
    filter_status = 0;
  }

  updateStatusTab(statuses_tabs, filter_status)
  //------------

  $.each(context.data.delivery_status, function () {
    $("<option>")
      .attr("value", this.name)
      .text(this.name)
      .appendTo('[name="status_list"]');
  });

  $.each(context.data.justin_status, function () {
    $("<option>")
      .attr("value", this.descr)
      .text(this.descr+'(J)')
      .appendTo('[name="status_list"]');
  });

  $.each(context.data.responsible_list, function () {
    $("<option>")
      .attr("value", this.id)
      .text(this.name)
      .appendTo('[name="responsible"]');
  });

  $.each(context.data.store_list, function () {
    $("<option>")
      .attr("value", this.title)
      .text(this.title)
      .appendTo('[name="store_list"]');
  });

  $.each(context.data.store_responsibl_list, function () {
    $("<option>")
      .attr("value", this.id)
      .text(this.name)
      .appendTo('[name="store_responsibl_list"]');
  });

  if(typeof context.data.select_items !== 'undefined') {

    $.each(context.data.select_items[3], function () {
      $("<option>")
        .attr("value", this.id)
        .attr("color", this.style)
        .text(this.name)
        .appendTo('[name="order_status"]');
    });

    $.each(context.data.select_items[5], function () {
      if(this.id == 16) {
        let arr = {0:lang.orders.text_24, 1: lang.orders.text_23}
      
        for(let a in arr) {
          $("<option>")
          .attr("value", this.id+','+a)
          .attr("color", this.style)
          .text(this.name+'('+arr[a]+')')
          .appendTo('[name="payment_list"]');
        }

        return
      } 

      $("<option>")
        .attr("value", this.id)
        .attr("color", this.style)
        .text(this.name)
        .appendTo('[name="payment_list"]');
    })
  }

  //-------------

  $.fn.dataTable.ext.errMode = 'none';
  table = $("#orders_page #orders_table")
    .on('init.dt', function () {
        $('[name="order_status"]').select2({
          width: 250,
          templateResult: setStatusTemplate,
          templateSelection: setStatusTemplate,
        });

        $('[name="client_groups"]').select2()
      
        $('[name="responsible"], [name="responsible_group"], [name="store_responsibl_list"], [name="store_id"], [name="status_list"], [name="payment_list"]').select2({
          width: 250
        });

    })
    .on( 'error.dt', function ( e, settings, techNote, message ) {
      // console.log( 'An error has been reported by DataTables: ', message );
      $.jGrowl(message, {
        header: lang.jGrowl.h_warning,
        theme: "alert-styled-left bg-danger",
        sticky: true,
      });

      let data = {
        'error': message,
        'path': context.path
      }
  
      http_post('./api/get_client_errors', data)

      $('#loading').hide()
      $('#orders_page').removeClass('op-50')
    } )
  .DataTable({
    columnDefs: [
      {
        checkboxes: {
          selectRow: true,
        },
      }
    ],
    select: {
      style: "os",
    },
    retrieve: true,
    serverSide: true,
    stateSave: false,
    scrollX: true,
    scrollY: window.innerHeight *0.61,
    pageLength: 50,
    lengthMenu: [10, 25, 50, 100, 250, 500],
    order: [[0, "desc"]],
    pagingType: "full_numbers",
    ajax: {
      url: "./api/orders",
      type: "POST",
      async: true,
      data: function (data) {
        $('#orders_page').addClass('op-50')
        $('#loading').show()
        data.status = filter_status;
        data.create_date_from = $("[name=create_date_from]").val();
        data.create_date_to = $("[name=create_date_to]").val();
        data.update_date_from = $("[name=update_date_from]").val();
        data.update_date_to = $("[name=update_date_to]").val();
        data.datetime_sent_from = $('[name="datetime_sent_from"]').val();
        data.datetime_sent_to = $('[name="datetime_sent_to"]').val();
      },
      dataSrc: function (json) {
        
        $('#loading').hide()
        $('#orders_page').removeClass('op-50')

        return json.data;
      },
    },
    columns: orders_table_columns,
    autoWidth: true,
    columnDefs: [{ width: "250px", targets: [1, 2] }],
    dom: '<"datatable-header"B><t><"datatable-footer"ipl>',
    buttons: [
      {
        extend: "excel",
        text: "Export excel",
        className: "exportExcel",
        filename: "Export excel",
        exportOptions: {
          modifier: {
            page: "all",
          },
        },
        customize: function (xlsx) {
          var sheet = xlsx.xl.worksheets["sheet1.xml"];

          $('row c[r^="D"]', sheet).each(function () {
            var phone_string = $("is t", this)
              .text()
              .replace(/[^+\d]/g, "");

            if (phone_string.length > 12) {
              var clear_count = 12 - phone_string.length;

              phone_string = phone_string.slice(0, clear_count);
            }

            phone_string = String(phone_string).replace(
              /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/,
              "$1 ($2) $3-$4-$5"
            );

            $("is t", this).text(phone_string);
          });
        },
      },
    ],
    language: DataTable_lang(),
    drawCallback: function () {
      $("#orders_table tbody tr").each(function () {
        if (empty($(this).attr("style"))) {
          var tr_id = $(this).attr("id");

          $("td.status span", this).each(function () {
            var tr_style = $(this).attr("color");

            $("#orders_table tbody tr#" + tr_id).css(
              "background-color",
              hexToRGB(tr_style, 0.25)
            );
          });
        }
      });

      $(".mask-phone").mask("38 (000) 000-00-00");
      $('[data-popup="popover"]').popover({ placement: "right" });
      $(this).find("tbody tr").addClass("pointer");

      function blink_text() {
        $(".blink").fadeOut(500);
        $(".blink").fadeIn(500);
      }
      setInterval(blink_text, 1000);

      $.each($("#orders_table_paginate span").children(), function (i) {
        if (
          $("#orders_table_paginate span .current").text() == $(this).text() ||
          parseInt($("#orders_table_paginate span .current").text()) + 1 ==
            $(this).text() ||
          parseInt($("#orders_table_paginate span .current").text()) - 1 ==
            $(this).text()
        ) {
        } else {
          $(this).remove();
        }
      });
  
      let px = ($('body').css('zoom') < 1 ) ? 0.74 : 0.61

      $("div.dataTables_scrollBody").height(window.innerHeight * px);

    },
    orderCellsTop: true,
    initComplete: function () {
      var api = this.api();

      //удалить все фильтры
      $("body")
        .on("click", "#delete_filter", function () {
          count_filter = 0;
        
          fields_filter.forEach(element => {
            $(element).removeClass("active-filter");
            $(element).parent().find(".select2-selection").removeClass("active-filter");
            $("#forFilters input").val("");
            $("#forFilters select").val("");
          });
        
          fields_filter = [];
          $("span[name='count_filter']").remove();
          $("#delete_filter").remove();
          api.columns().every(function () {
            this.search("");
          });
          api.draw();
        });
      //

      api.columns().every(function (i) {
        var that = this;

        that.search("");

        $("input", $("#forFilters").children()[i])
          .off("change")
          .on("change", function (e) {

            if(this.value.trim() !== "") {
              if(!fields_filter.includes(this))
              {
                fields_filter.push(this);
                count_filter++;
                $(this).addClass("active-filter");
              }
            }
            else
            {
              if(fields_filter.includes(this))
              {
                const index = fields_filter.indexOf(this);
                if (index > -1) {
                  fields_filter.splice(index, 1);
                }
                count_filter--;
                $(this).removeClass("active-filter");
              }
            }

            $("span[name='count_filter']").remove();
            $("#delete_filter").remove();
            if(count_filter > 0) $(".breadcrumb-line .breadcrumb")
            .append(createFilterLabelBody(count_filter));

            if (that.search() !== this.value) {
              that.search(this.value).draw();
            }
        });

      $("select", $("#forFilters").children()[i])
        .off("change")
        .on("change", function () {

          if(this.value.trim() !== "") {
            if(!fields_filter.includes(this))
            {
              fields_filter.push(this);
              count_filter++;
              $(this).parent().find(".select2-selection").addClass("active-filter");
            }
          }
          else
          {
            if(fields_filter.includes(this))
            {
              const index = fields_filter.indexOf(this);
              if (index > -1) {
                fields_filter.splice(index, 1);
              }
              count_filter--;
              
              $(this).parent().find(".select2-selection").removeClass("active-filter");
              
            }
          }

          $("span[name='count_filter']").remove();
          $("#delete_filter").remove();
          if(count_filter > 0) $(".breadcrumb-line .breadcrumb")
          .append(createFilterLabelBody(count_filter));

          if (that.search() !== this.value) {
            that.search(this.value).draw();
          }
        });
      });

      if(api.column(0).checkboxes !== undefined) {
        $("#orders_page #rows_selected").text(api.column(0).checkboxes.selected().length);
      }
        
      

      // var $this = $(
      //   "table#orders_table.table"
      // );

      // var thead = $this
      //     .parents(".dataTables_scroll")
      //     .find(".dataTables_scrollHead table"),
      //   targetTh = thead.find("tr").eq(0).find("th"),
      //   targetTd = $this.find("td");

      // window.ad = thead

      // thead.find("#forFilters th").each(function (index) {
      //   var th = targetTh.eq(index),
      //     w = th.innerWidth();
      //   $(this).css("width", w + "px");
      //   targetTd.eq(index).css("width", w + "px");
      // });

//       setTimeout(function () {
//         table.columns.adjust().draw();
//       }, 500);
    },
    createdRow: function (row, data, index) {
      if (data.order_return == 1) {
        $(row).css("background-color", "rgba(255, 0, 0, 0.5)");
        $(row).addClass("order_return");
      }
      if (data.payment_received == 1) {
        $(row).css("background-color", "rgba(28, 173, 34, 0.5)");
        $(row).addClass("payment_received");
      }

      if (
        Date.parse(data.new_datetime) + 15 * 1000 > Date.now() &&
        data.view_id != $.cookie("user.id")
      ) {
        $(row).css("background-color", "rgba(0, 142, 255, 0.5)");
      }
    },
  });

   setTimeout(function () {
      if($('.dataTables_scrollBody tr').css('width') != $('.dataTables_scrollHeadInner').css('width')) {
        table.columns.adjust().draw();
      }
  }, 100);

  table.on("order search", function () {
    $(".dataTables_scroll .dataTables_scrollBody").addClass("_loading");
    setTimeout(function () {
      var targetTd = $(
        "table#orders_table.table.table-bordered.table-xxs.table-responsive.datatable-basic.dataTable.no-footer"
      ).find("tbody tr");
      var th = $(
        ".dataTables_scrollHead table.table.table-bordered.table-xxs.table-responsive.datatable-basic.dataTable.no-footer"
      )
        .find("tr")
        .eq(0)
        .find("th");
      $(
        "table#orders_table.table.table-bordered.table-xxs.table-responsive.datatable-basic.dataTable.no-footer"
      )
        .find("tr")
        .each(function (index) {
          targetTd.find("td").each(function (index) {
            $(this).css("width", th.eq(index).innerWidth() + "px");
          });
        });
      setTimeout(function () {
        $(".dataTables_scroll .dataTables_scrollBody").removeClass("_loading");
      }, 500);
    }, 200);
  });

  $("body")
    .off('click', '#orders_table .ig_redirect')
    .on('click', '#orders_table .ig_redirect', function() {
      ctrlC(this)
      localStorage.from_order = $(this).parents('tr').attr('id')
      window.open('/#/chats', "_blank")
    })

  $("body")
    .on("mouseleave", ".out", function () {
      $(this).stop().animate({ height: 12 });
    })
    .on("mouseenter", ".out", function () {
      $(this).stop().animate({ height: 16 });
    });

  $("body")
    .off("click", "#payment_received")
    .on("click", "#payment_received", function (event) {
      var id = $(this).attr("id");

      var rows = table.rows({ selected: true }).ids();

      $.each(rows, function (i, row) {
        var data = {};

        if ($("#orders_table tbody tr#" + row).hasClass("payment_received")) {
          data[id] = 0;
        } else {
          data[id] = 1;
        }

        http_post("./api/order/" + row + "/" + id, data);
      });

      table.ajax.reload();
    });

  $("body")
    .off("click", "#order_return")
    .on("click", "#order_return", function (event) {
      var id = $(this).attr("id");

      var rows = table.rows({ selected: true }).ids();

      $.each(rows, function (i, row) {
        var data = {};

        if ($("#orders_table tbody tr#" + row).hasClass("order_return")) {
          data[id] = 0;
        } else {
          data[id] = 1;
        }

        http_post("./api/order/" + row + "/" + id, data);
      });

      table.ajax.reload();
    });

  $("body")
    .off("click", "#import_excel")
    .on("click", "#import_excel", function (event) {
      
      if(table.rows({ selected: true }).ids().length > 0) {
      
        var $input = $('#modal_import_excel [name="file"]');
        var data = new FormData();
        data.append("file", $input.prop("files")[0]);

        $.ajax({
          url: "./api/select/orders/ttn/from/excel",
          data: data,
          processData: false,
          contentType: false,
          type: "POST",
          success: function (data) {
            var file_ttns = JSON.parse(data).file_ttns;

            var action = $('#modal_import_excel [name="action"]').val();

            var orders_id = [];
            $.each(table.rows({ selected: true }).ids(), function (i, row) {
              orders_id.push(row);
            });

            var data = {
              action: action,
              orders_id: orders_id,
              file_ttns: file_ttns,
            };

            var response = http_get("./api/create/comparison/excel?" + $.param(data));

            if(response.status == "409") {
              
              $.jGrowl(response.response.message, {
                header: lang.jGrowl.h_warning,
                theme: "alert-styled-left bg-danger",
                sticky: true,
              });

            } else {

              $("#modal_import_excel").modal("hide");

              table.ajax.reload();
              cross_download("./api/create/comparison/excel?" + $.param(data), 'orders.xlsx')
              
              $.jGrowl(lang.orders.jGrowl_text_1, {
                header: lang.jGrowl.h_update,
                theme: "alert-styled-left bg-success",
                sticky: true,
              });
            }
          },
          error: function (error) {
            var response = JSON.parse(error.responseText);

            $.jGrowl(response.message, {
              header: lang.jGrowl.h_warning,
              theme: "alert-styled-left bg-danger",
              sticky: true,
            });
          },
        });
      } else {
      
        $.jGrowl(lang.orders.jGrowl_text_2, {
          header: lang.jGrowl.h_warning,
          theme: "alert-styled-left bg-danger",
          sticky: true,
        });

      }
    });

  $("body")
    .off("click", "#show_modal_import_orders_excel")
    .on("click", "#show_modal_import_orders_excel", function (event) {
      
      var rows = table.rows({ selected: true }).ids();

      $("#orders_id").empty();
      
      $.each(rows, function (i, row) {
        if (empty($("#orders_id").text())) {
          $("#orders_id").append(row);
        } else {
          $("#orders_id").append(", " + row);
        }
      });

      $("#modal_import_orders_excel").modal("show");

      if (rows.length > 0) {

        $("#selected_orders_count").text(rows.length);
      } else {
        $("#selected_orders_count").text(0);
      }

    });

  $('body')
    .on('click', '#open_edite_colums', function(){
      
      sesStorage.getData('columns').forEach(el => {
        $($('#modal_edite_colums [name="'+el+'"]')).prop('checked', true)
      })

      $('#modal_edite_colums').modal('show')
    })

  $('body')
    .on('click', '#save_columns', function(){
      let inputs = $('#modal_edite_colums').find('input:checkbox:checked')
      let data = {'columns': []}

      inputs.map((i, el) => {
        data.columns.push($(el).attr('name'))
      })

      let resp = http_post('./api/config/save/orders_columns', data)

      if(resp.status == 200) {
        sesStorage.update('columns')
        location.reload()
      }
    })
    
  $("body")
    .off("click", "#import_orders_excel")
    .on("click", "#import_orders_excel", function (event) {
      
      var $input = $('#modal_import_orders_excel [name="file"]');
      var data = new FormData();
      data.append("file", $input.prop("files")[0]);

      $.ajax({
        url: "./api/import/orders/from/excel",
        data: data,
        processData: false,
        contentType: false,
        async: false,
        type: "POST",
        success: function (data) {
          var response = JSON.parse(data);
          
          response.errors = response.errors.replace(/.; /g, ";<br>");
          $( "#modal_import_orders_excel > div > div > div.modal-body" ).append(
            "<p class =\"logs_import_orders_excel\">"+lang.orders.text_25+" - "+ response.success +".</p><br>"
          ).append( "<p class =\"logs_import_orders_excel\">"+lang.orders.errors+": "+ response.errors +"</p>" );
          
          $.jGrowl(lang.orders.jGrowl_text_3, {
            header: lang.jGrowl.h_update,
            theme: "alert-styled-left bg-success",
            sticky: true,
          });

        },
        error: function (error) {
          var response = JSON.parse(error.responseText);

          $.jGrowl(response.message, {
            header: lang.jGrowl.h_warning,
            theme: "alert-styled-left bg-danger",
            sticky: true,
          });
        },
      });

    });

    // действие после закрытия окна импорта Excel
  $('#modal_import_orders_excel').on('hidden.bs.modal', function() {
    $(".logs_import_orders_excel").empty();
    table.ajax.reload();
  });

  $("body")
    .off("click", "#edit_order")
    .on("click", "#edit_order", function (event) {
      var rows = table.rows({ selected: true }).ids();

      window.open("/#/order/" + rows[0], "_blank");
    });

  $("body")
    .off("click", "#order_state_cancel_all")
    .on("click", "#order_state_cancel_all", function (event) {
      var rows = table.rows({ selected: true }).ids();

      $.each(rows, function (i, row) {
        http_post("./api/order/" + row + "/order_return", { order_return: 0 });
        http_post("./api/order/" + row + "/payment_received", {
          payment_received: 0,
        });
      });

      table.ajax.reload();
    });

  //Сменить статус
  $("body")
    .off("click", "#show_modal_change_status")
    .on("click", "#show_modal_change_status", function (event) {
      var rows = table.rows({ selected: true }).ids();

      $("#orders_id").empty();

      if ($('#modal_change_status [class=switchery]').prop("checked")){
        date = new Date()
        $('[name="date_sent"]').removeAttr('disabled').datepicker("setDate", date)
        $('[name="time_sent"]').removeAttr('disabled').val(date.toLocaleTimeString());
      } else {
        $('[name="date_sent"], [name="time_sent"]')
          .attr('disabled', true)
          .val('')
      }
      
      $.each(rows, function (i, row) {
        if (empty($("#orders_id").text())) {
          $("#orders_id").append(row);
        } else {
          $("#orders_id").append(", " + row);
        }
      });

      $("#modal_change_status").modal("show");

      if (rows.length > 0) {
        $("#selected_orders_count").text(rows.length);
      } else {
        $("#selected_orders_count").text(0);
      }
    });


  $('body')
    .off('click', '#edit_prepay')
    .on('click', '#edit_prepay', function() {
      let rows = table.rows({ selected: true }).ids();

      $('#modal_edite_prepay [name="count-sorder"]').text(rows.length)
      $('#modal_edite_prepay').modal('show')
    })

  // Сменить дату отправки
  $("body")
    .off("click", "#show_modal_change_date_sent")
    .on("click", "#show_modal_change_date_sent", function (event) {
      var rows = table.rows({ selected: true }).ids();

      date = new Date()
      $('[name="date_sent"]').removeAttr('disabled').datepicker("setDate", date)
      $('[name="time_sent"]').removeAttr('disabled').val(date.toLocaleTimeString());

      $("#orders_id_sent").empty();

      $.each(rows, function (i, row) {
        if (empty($("#orders_id_sent").text())) {
          $("#orders_id_sent").append(row);
        } else {
          $("#orders_id_sent").append(", " + row);
        }
      });

      $("#modal_change_date_sent").modal("show");

      if (rows.length > 0) {
        $("#selected_orders_sent_count").text(rows.length);
      } else {
        $("#selected_orders_sent_count").text(0);
      }
    });

  // Создать ТТН
  $("body")
    .off("click", "#show_modal_create_ttn_for_order, #j_modal_create_EN_for_order")
    .on("click", "#show_modal_create_ttn_for_order, #j_modal_create_EN_for_order", function (event) {
      var rows = table.rows({ selected: true }).ids();
      let root_tag = ''

      if($(this).attr('id') == 'j_modal_create_EN_for_order')
      {
        root_tag = '#modal_create_EN_for_order'
      }

      if($(this).attr('id') == 'show_modal_create_ttn_for_order')
      {
        root_tag = '#modal_create_ttn_for_order'
      }

      if ($(root_tag + ' .weight_orders [class=switchery]').prop("checked")){
        $(root_tag+ ' [name="weight"]')
          .attr('disabled', false)
          .attr('style', '')
          .val('')
      } else {
        $(root_tag+ ' [name="weight"]')
          .attr('disabled', true)
          .attr('style', 'background: #eee;')
          .val('')
      }

      $(root_tag+ " #orders_id_for_ttn").empty();

      $.each(rows, function (i, row) {
        if (empty($(root_tag+ " #orders_id_for_ttn").text())) {
          $(root_tag+ " #orders_id_for_ttn").append(row);
        } else {
          $(root_tag+ " #orders_id_for_ttn").append(", " + row);
        }
      });

      $(root_tag).modal("show");

      if (rows.length > 0) {
        $(root_tag+ " #selected_orders_for_ttn_count").text(rows.length);
      } else {
        $(root_tag+ " #selected_orders_for_ttn_count").text(0);
      }
    });

  $("body")
    .off("change", '.weight_orders [class=switchery]')
    .on("change", '.weight_orders [class=switchery]', function () {
    
      $('.weight_orders [class=switchery]').each((i, el) => {
        let tag = $(el).attr('name') == 'justin' ? '#modal_create_EN_for_order' : '#modal_create_ttn_for_order'

        if ($(el).prop("checked")){
          $(tag+' [name="weight"]')
            .attr('disabled', false)
            .attr('style', '')
            .val('')
        } else {
          $(tag+' [name="weight"]')
            .attr('disabled', true)
            .attr('style', 'background: #eee;')
            .val('')
        }
      })
    });

  $("body")
    .off("change", '#modal_change_status [name="status"]')
    .on("change", '#modal_change_status [name="status"]', function () {
      if ($(this).val() == "6") {
        $("#datetime_sent").css("display", "block");
      } else {
        $("#datetime_sent").css("display", "none");
      }
    });
  $("body")
    .off("click", "#return_ttn_for_order")
    .on("click", "#return_ttn_for_order", function (event) {
      swal(
        {
          title: lang.swal.title_attention,
          text: lang.orders.swal_text_1+" "+table.rows({ selected: true }).ids().length+" ТТН",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#EF5350",
          confirmButtonText: lang.swal.b_yes,
          cancelButtonText: lang.swal.but_no,
          showLoaderOnConfirm: true,
          closeOnConfirm: true,
          closeOnCancel: true,
        },
        function () {
          var rows = table.rows({ selected: true }).ids();

          $.each(rows, function (i, row) {
            var response = http_post("./api/novaposhta/ttn/" + row + "/return");

            if(response.status !== 200){
              $.jGrowl(response.response.message, {
                header: lang.jGrowl.h_warning,
                life: 5000,
                theme: "alert-styled-left bg-danger",
              });
              return
            }

            $.each(response.response.message, function (i, product) {
              $.jGrowl(product, {
                header: response.status == 200 ? lang.jGrowl.h_success_1 : lang.jGrowl.h_warning,
                life: 5000,
                theme:
                  response.status == 200
                    ? "alert-styled-left bg-success"
                    : "alert-styled-left bg-danger",
              });
            });
          });
        }
      );
    });

  $("body")
    .off("click", "#save_orders_sent")
    .on("click", "#save_orders_sent", function (event) {

      let rows = table.rows({ selected: true }).ids();
      let datetime_sent = "";

      $("#modal_change_date_sent input").each(function (e, d) {
        datetime_sent += $(d).val() + " ";
      });

      $.each(rows, function (i, row) {
        var change = true;

        var response = http_post("./api/order/" + row, {
          sent: datetime_sent.trim(),
        });

        if (response.status == 200) {

          $.jGrowl(lang.orders.jGrowl_text_4, {
            header: '',
            theme: "alert-styled-left bg-success",
            sticky: true,
          });
        } else {

          $.jGrowl(lang.order.jGrowl_text_7, {
            header: lang.jGrowl.h_warning,
            life: 5000,
            theme: "alert-styled-left bg-danger",
          });
        }
      })
    })

  $("body")
    .off("click", "#save_orders_status")
    .on("click", "#save_orders_status", function (event) {
      let status = $('#modal_change_status [name="status"]').val();

      var rows = table.rows({ selected: true }).ids();
      var datetime_sent = "";

      if ($("#datetime_sent").css("display") != "none") {
        $("#datetime_sent input:text").each(function (e, d) {
          datetime_sent += $(d).val() + " ";
        });
      }

      $.each(rows, function (i, row) {
        var change = true;

        var response = http_post("./api/order/" + row, {
          status: status,
          sent: datetime_sent.trim(),
        });

        if (response.status == 200) {
          if (!empty(response.response.warnings)) {
            $.jGrowl(response.response.warnings, {
              header: lang.jGrowl.h_warning_2,
              life: 5000,
              theme: "alert-styled-left bg-warning",
            });

            change = false;
          }

          if(!empty(response.response.sending) && response.response.sending.length > 0) {
            $.jGrowl('', {
              header: lang.orders.jGrowl_text_19,
              life: 5000,
              theme: "alert-styled-left bg-success",
            });
          }
        } else if (response.status == 409) {
          $.jGrowl(
            "Товар <b>" +
              response.response.product_name +
              "</b>. "+lang.order.jGrowl_text_16,
            {
              header: lang.jGrowl.h_warning,
              life: 5000,
              theme: "alert-styled-left bg-danger",
            }
          );

          change = false;
        } else if (response.status == 406) {
          $.jGrowl(response.response.message, {
            header: lang.order.jGrowl_text_14,
            life: 5000,
            theme: "alert-styled-left bg-danger",
          });

          change = false;
        } else if (response.status == 400) {
          $.jGrowl(lang.order.jGrowl_text_18, {
            header: lang.order.jGrowl_text_14,
            life: 5000,
            theme: "alert-styled-left bg-danger",
          });

          change = false;
        } else {
          $.jGrowl(lang.order.jGrowl_text_7, {
            header: lang.jGrowl.h_warning,
            life: 5000,
            theme: "alert-styled-left bg-danger",
          });

          change = false;
        }

        if (change) {
          swal({
            title: lang.orders.swal_title_1,
            text: lang.orders.swal_text_2,
            type: "success",
            confirmButtonColor: "#607D8B",
          });
        } else {
          swal({
            title: lang.swal.title_error,
            text: lang.orders.swal_text_3,
            confirmButtonColor: "#EF5350",
            type: "error",
          });
        }
      });

      updateStatusTab(statuses_tabs, filter_status)
      table.ajax.reload();

      $("#modal_change_status").modal("hide");
    });

  $('body')
    .off('click', '#ok_edite_prepay')
    .on('click', '#ok_edite_prepay', function() {
      let rows = table.rows({ selected: true }).ids();
     
      let data = {
        orders: rows.toArray(),
        value: $('[name="prepay_status"]').val()
      }

      let response = http_post('./api/orders/update/prepay_status', data)

      if(response.status == 200) {
        $.jGrowl(lang.orders.jGrowl_text_5, {
          header: lang.orders.jGrowl_text_6+": <b>" + response.response.update + "</b>",
          theme: "alert-styled-left bg-success",
          sticky: true,
        });

        table.ajax.reload()
      } else {
        $.jGrowl(lang.jGrowl.h_warning, {
          header: response.response.message,
          theme: "alert-styled-left bg-warning",
          sticky: true,
        });
      }
    })

  $("body")
    .off("click", "#show_modal_send_sms")
    .on("click", "#show_modal_send_sms", function (event) {
      $("#modal_send_sms").modal("show");

      var rows = table.rows({ selected: true }).ids();

      if (rows.length > 0) {
        $("#orders_client_count").text(rows.length);
      } else {
        $("#orders_client_count").text(0);
      }

      var response = http_get("./api/sms/balance");

      if (response.status == 200) {
        $("#turbo_sms_balance").text(response.response);
      }

      $("body")
        .off("change", '[name="turbo_sms_template"]')
        .on("change", '[name="turbo_sms_template"]', function (event) {
          if ($('[name="turbo_sms_template"]').val() == 0) {
            $('[name="turbo_sms_message"]').val("");
          } else {
            var sms_template = $('[name="turbo_sms_template"]').val();

            var data = {
              name: sms_template,
            };

            var response = http_post("./api/sms/template", data);

            if (response.status == 200) {
              template_sms_text = response.response.value;
              $('[name="turbo_sms_message"]').val(template_sms_text);
            }
          }
        });
    });

  $("body")
    .off("click", "#send_sms")
    .on("click", "#send_sms", function (event) {
      var rows = table.rows({ selected: true }).ids();

      if (rows.length > 0) {
        var sender = $('[name="turbo_sms_sender"]').val();

        $.each(rows, function (index, row) {
          var order = http_get("./api/order/" + row).response;

          var client_fio = order.client.fio.split(" ");
          var client_first_name = client_fio[0] ? client_fio[0] : "";
          var client_middle_name = client_fio[1] ? client_fio[1] : "";
          var client_last_name = client_fio[2] ? client_fio[2] : "";
          var summa = order.delivery.cost_product
            ? order.delivery.cost_product
            : "";
          var ttn = order.delivery.ttn ? order.delivery.ttn : "";
          var comment_ttn = order.delivery.comment
            ? order.delivery.comment
            : "";
          var cost_delievery = order.delivery.cost ? order.delivery.cost : "";

          var products = "";
          var product = order.products;
          product.forEach((element) => {
            products += element.name + ", ";
          });
          products = products.substring(0, products.length - 2);

          message_text = $('[name="turbo_sms_message"]')
            .val()
            .replace("{ttn}", ttn)
            .replace("{first_name}", client_first_name)
            .replace("{middle_name}", client_middle_name)
            .replace("{last_name}", client_last_name)
            .replace("{products}", products)
            .replace("{summa}", summa)
            .replace("{comment_ttn}", comment_ttn)
            .replace("{cost_delievery}", cost_delievery);

          var data = {
            sms_template:
              $('[name="turbo_sms_template"]').val() == 0
                ? ""
                : $('[name="turbo_sms_template"]').val(),
            order_id: order.order.id,
            phone: order.client.phone,
            text: message_text,
            sender: sender,
          };

          var response = http_post("./api/sms/send", data);
        });
      }
    });

    // создать ЕН Justin 
  $('body')
    .off('click', '#create_EN_for_order')
    .on('click', '#create_EN_for_order', function() {
      swal(
        {
          title: lang.swal.title_attention,
          text: lang.orders.swal_text_4+" ЕН Justin",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#EF5350",
          confirmButtonText: lang.swal.b_yes,
          cancelButtonText: lang.swal.but_no,
          showLoaderOnConfirm: true,
          closeOnConfirm: true,
          closeOnCancel: true,
        },
        function () {
          let rows = table.rows({ selected: true }).ids();
          if (rows.length != 0) {

            let response = http_post('./api/delivery/justin/createEN', {'id_order': rows.toArray()})

            if(response.status == 200 || response.status == 409){
              response.response.success.forEach((el, i) => {
                if(typeof el.error != 'undefined') {
                  $.jGrowl(el.error, {
                    header: lang.jGrowl.h_warning,
                    life: 15000,
                    theme: "alert-styled-left bg-danger",
                  });

                  response.response.success.splice(i, 1)
                }
              })

              if(response.response.success.length > 0) {
                $.jGrowl(lang.orders.jGrowl_text_7+" "+response.response.success.length+" ЕН", {
                  header: "ЕН "+lang.orders.jGrowl_text_8,
                  theme: "alert-styled-left bg-success",
                  life: 15000
                });
              }
            
              if(typeof response.response.errors != 'undefined') {
                response.response.errors.forEach(el => {
                  $.jGrowl(el, {
                    header: lang.jGrowl.h_warning,
                    life: 15000,
                    theme: "alert-styled-left bg-danger"
                  });
                })
              }

          }else {
            $.jGrowl({
              header: lang.orders.jGrowl_text_9+" </b>",
              theme: "alert-styled-left bg-danger",
              life: 15000
            });
          }
        }
      })
    })

  //нажатие в модальном окне->создать
  $("body")
    .off("click", "#create_ttn_for_order")
    .on("click", "#create_ttn_for_order", function (event) {
      swal(
        {
          title: lang.swal.title_attention,
          text: lang.orders.swal_text_4+" ТТН",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#EF5350",
          confirmButtonText: lang.swal.b_yes,
          cancelButtonText: lang.swal.but_no,
          showLoaderOnConfirm: true,
          closeOnConfirm: false,
          closeOnCancel: true,
        },
        function (isConfirm) {
          if (isConfirm) {
            var rows = table.rows({ selected: true }).ids().toArray();
            if (rows.length != 0) {
              $.each(rows, function (i, row) {
                setTimeout(() => {
                  http_post_async(
                    "./api/novaposhta/order/" + row + "/ttn", {
                      weight: $('[name="weight"]').val()
                    }, function (response) {
                      if (response.status == 200) {
                        $.jGrowl("ТТН "+lang.orders.jGrowl_text_8, {
                          header: lang.orders.jGrowl_text_10+" #" + row + "</b>",
                          theme: "alert-styled-left bg-success",
                          sticky: true,
                        });
        
                        $('[name="cost"]').val(response.response.cost);
                        $('[name="status"]').val(response.response.status);
                        $('[name="tnn"]').val(response.response.tnn);
        
                        $.each(response.response.warnings, function (index, value) {
                          $.jGrowl(value, {
                            header: lang.orders.jGrowl_text_11+" #" + row + "</b>",
                            theme: "alert-styled-left bg-warning",
                            sticky: true,
                          });
                        });
                      } else if (response.status == 409) {
                        $.jGrowl(response.response.error, {
                          header: lang.orders.jGrowl_text_12+" #" + row + "</b>",
                          theme: "alert-styled-left bg-danger",
                          sticky: true,
                        });
                      } else if (response.status == 405) {
                        $.each(response.response.errors, function (index, value) {
                          $.jGrowl(value, {
                            header: lang.orders.jGrowl_text_12+" #" + row + "</b>",
                            theme: "alert-styled-left bg-danger",
                            sticky: true,
                          });
                        });
                      } else {
                        $.jGrowl('Ошибка', {
                          header: lang.orders.jGrowl_text_12+" #" + row + "</b>",
                          theme: "alert-styled-left bg-danger",
                          sticky: true,
                        });
                      }

                      if(i == rows.length-1) {
                        swal({
                          title: lang.orders.jGrowl_text_13,
                          text: "",
                          confirmButtonColor: "#66BB6A",
                          type: "success"
                        });
                      }
                    }
                  );
                }, i * 1000)
              });
              
            } else {
              $.jGrowl({
                header: lang.orders.jGrowl_text_9+" </b>",
                theme: "alert-styled-left bg-danger",
                sticky: true,
              });
              
              swal.close()
            }
          }
        }
      );
    });

  //Удаление ТТН
  $("body")
    .off("click", "#delete_ttn_for_order")
    .on("click", "#delete_ttn_for_order", function (event) {
      swal(
        {
          title: lang.swal.title_attention,
          text: lang.orders.swal_text_5+" "+table.rows({ selected: true }).ids().length+" ТТН",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#EF5350",
          confirmButtonText: lang.swal.b_yes,
          cancelButtonText: lang.swal.but_no,
          showLoaderOnConfirm: true,
          closeOnConfirm: true,
          closeOnCancel: true,
        },
        function () {
          var rows = table.rows({ selected: true }).ids();
          if (rows.length != 0) {
            $.each(rows, function (i, row) {
              var response = http_post(
                "./api/novaposhta/order/" + row + "/ttn/delete"
              );

              if (response.status == 200) {
                $.jGrowl("ТТН "+lang.orders.jGrowl_text_14, {
                  header: lang.orders.jGrowl_text_10+" #" + row + "</b>",
                  theme: "alert-styled-left bg-success",
                  sticky: true,
                });

                $('[name="cost"]').val(response.response.cost);
                $('[name="status"]').val(response.response.status);
                $('[name="tnn"]').val(response.response.tnn);

                $.each(response.response.warnings, function (index, value) {
                  $.jGrowl(value, {
                    header: lang.orders.jGrowl_text_11+" #" + row + "</b>",
                    theme: "alert-styled-left bg-warning",
                    sticky: true,
                  });
                });
              } else if (response.status == 409) {
                $.jGrowl(response.response.error, {
                  header: lang.orders.jGrowl_text_12+" #" + row + "</b>",
                  theme: "alert-styled-left bg-danger",
                  sticky: true,
                });
              } else if (response.status == 405) {
                $.each(response.response.errors, function (index, value) {
                  $.jGrowl(value, {
                    header: lang.orders.jGrowl_text_12+" #" + row + "</b>",
                    theme: "alert-styled-left bg-danger",
                    sticky: true,
                  });
                });
              }
            });
          } else {
            $.jGrowl({
              header: lang.orders.jGrowl_text_9+" </b>",
              theme: "alert-styled-left bg-danger",
              sticky: true,
            });
          }
        }
      );
    });

  //Распечатать ТТН
  $("body")
    .off('click', '#ttn_pdf, #ttn_pdf_zebra')
    .on('click', '#ttn_pdf, #ttn_pdf_zebra', function() {
    
      let orders = []

      $.each(table.rows({ selected: true }).ids(), (i, row) => {
        orders.push(row)
      })

      if(orders.length == 0) {
        $.jGrowl(lang.orders.jGrowl_text_15, {
          header: lang.jGrowl.h_warning,
          theme: "alert-styled-left bg-danger",
          sticky: true,
        });

        return false
      }

      let type = '1'
            
      switch($(this).attr('id')) {
          case 'ttn_pdf_zebra': type = '2'; break;
      }

      let data = {
        orders: orders,
        type: $(this).attr('id')
      }

      let response = http_post('./api/orders/novaposhta/ttn', data).response

      if(response.status == 'ok') {
        
        for(let ac in response.data) {
          window.open('./api/novaposhta/ttn/get_document?ids='+response.data[ac].join(',') + '&ac=' + ac + '&t=' + type, '_blank')
        }
      }

      if(response.status == 'error') {
        $.jGrowl(response.message, {
          header: lang.jGrowl.h_warning,
          theme: "alert-styled-left bg-danger",
          sticky: true,
        });
      }

    })

  //Удалить ЕН для заказа
  $("body")
    .off("click", "#j_delete_EN_for_order")
    .on("click", "#j_delete_EN_for_order", function (event) {
      let order = []

      table.rows('.selected').data().each(el => {
          order.push(el.id)
      })

      if(order.length == 0) {
          $.jGrowl(lang.orders.jGrowl_text_15, {
              header: lang.jGrowl.h_warning,
              theme: 'alert-styled-left bg-danger',
              sticky: true
          });
          return
      } 

      swal(
        {
          title: lang.swal.title_attention,
          text: lang.orders.swal_text_5+" "+table.rows({ selected: true }).ids().length+" ЕН",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#EF5350",
          confirmButtonText: lang.swal.b_yes,
          cancelButtonText: lang.swal.but_no,
          showLoaderOnConfirm: true,
          closeOnConfirm: true,
          closeOnCancel: true,
        }, function(isConfirm){
          if(isConfirm) {
            let resp = http_post('./api/delivery/justin/massCancelENForOrders', {"ids": order})

            if(resp.status == 409 || resp.status == 200) {
              if(resp.response.success.length > 0){
                  $.jGrowl(lang.jGrowl.h_delete+' '+resp.response.success.length+' ЕН', {
                      header: lang.jGrowl.h_delete,
                      theme: 'alert-styled-left bg-success',
                      sticky: true
                  });

                  table.ajax.reload()
              }

              if(resp.response.error.length > 0){
                  resp.response.error.forEach(element => {
                      $.jGrowl(element, {
                          header: lang.jGrowl.h_warning,
                          theme: 'alert-styled-left bg-danger',
                          sticky: true
                      });
                  });
              }
            }
          }
        })
    })

  // Распечатать стикеры ЕН для заказа
  $('body')
    .off('click', '#j_EN_pdf')
    .on('click', '#j_EN_pdf', function() {
      let orders = table.rows({ selected: true }).ids().toArray()


      if(orders.length == 0) {
        $.jGrowl(lang,orders.jGrowl_text_15, {
          header: lang.jGrowl.h_warning,
          theme: "alert-styled-left bg-danger",
          sticky: true,
        });

        return false
      }

      let response = http_post('./api/delivery/justin/createStickerForOrder', {'ids': orders})


      if(response.status == 200) {
        window.open('./api/justin/en/get_document?name='+response.response.name, '_blank')
      }

      if(response.status == 409){
        $.jGrowl(response.response.error, {
          header: lang.jGrowl.h_warning,
          life: 5000,
          theme: "alert-styled-left bg-danger",
        });
      }
      
    })

  $('body')
    .off('click', '#j_return_EN_for_order')
    .on('click', '#j_return_EN_for_order', function() {
      let order = []

      table.rows('.selected').data().each(el => {
          order.push(el.id)
      })

      if(order.length == 0) {
          $.jGrowl(lang.orders.jGrowl_text_15, {
              header: lang.jGrowl.h_warning,
              theme: 'alert-styled-left bg-danger',
              sticky: true
          });
          return
      }

      swal(
        {
          title: lang.swal.title_attention,
          text: lang.orders.swal_text_6+" "+table.rows({ selected: true }).ids().length+" ЕН",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#EF5350",
          confirmButtonText: lang.swal.b_yes,
          cancelButtonText: lang.swal.but_no,
          showLoaderOnConfirm: true,
          closeOnConfirm: true,
          closeOnCancel: true,
        }, function(isConfirm){
          if(isConfirm) {
            let resp = http_post('./api/delivery/justin/createReturnForOrders', {"ids": order})

            if(resp.status == 200) {
              resp.response.forEach(el => {
                if(typeof el.error !== 'undefined') {
                  $.jGrowl(el.error, {
                    header: lang.jGrowl.h_warning,
                    life: 5000,
                    theme: "alert-styled-left bg-danger",
                  });
                }
  
                if(typeof el.result !== 'undefined') {
                  $.jGrowl(el.result, {
                    header: "",
                    life: 5000,
                    theme: "alert-styled-left bg-warning",
                  });
                }
              })
            }
          }
        })
    })


  $(".datatable-header").hide();

  $(window).resize(function () {
    // $("div.dataTables_scrollBody").height(window.innerHeight - 300);
  });

  function setStatusTemplate(currency) {
    if (!empty(currency.text) && currency.text != "Все") {
      return $(
        '<div><font color="' +
          $(currency.element).attr("color") +
          '"><i class="icon-circle2"></i></font> ' +
          currency.text +
          "</div>"
      );
    } else {
      return currency.text;
    }
  }

  $('[name="status"]').select2({
    width: 250,
    templateResult: setStatusTemplate,
    templateSelection: setStatusTemplate,
    dropdownParent: $("#modal_change_status"),
  });

  //нажатие настройки->удалить
  $("body")
    .off("click", "#delete_orders")
    .on("click", "#delete_orders", function () {
      swal(
        {
          title: lang.swal.title_attention,
          text: lang.orders.swal_text_7,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#EF5350",
          confirmButtonText: lang.swal.b_yes_delet,
          cancelButtonText: lang.swal.but_no,
          showLoaderOnConfirm: true,
          closeOnConfirm: true,
          closeOnCancel: true,
        },
        function () {
          var data = {};
          data.orders = [];

          data.values = {
            status: 32,
          };

          var rows = table.rows({ selected: true }).ids();

          $.each(rows, function (i, row) {
            data.orders.push(row);
          });

          $.each(data.orders, function (i, row) {
            var response = http_post("./api/order/" + row + "/basket", data);

            if (response.status == 200) {

              updateStatusTab(statuses_tabs, filter_status)
              table.ajax.reload();
              
              $.jGrowl({
                header: lang.orders.jGrowl_text_16+" </b>",
                theme: "alert-styled-left bg-danger",
                sticky: true,
              });
            }
          });
        }
      );
    });

  // нажатие настройки->Экспорт Excel
  $("body")
    .off("click", "#export_excel")
    .on("click", "#export_excel", function () {
      swal(
        {
          title: lang.swal.title_attention,
          text: lang.orders.swal_text_8,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#EF5350",
          confirmButtonText: lang.orders.swal_b_yes,
          cancelButtonText: lang.swal.but_no,
          showLoaderOnConfirm: true,
          closeOnConfirm: true,
          closeOnCancel: true,
        },
        function () {
          $(".buttons-excel").trigger("click");
        }
      );
    });

  $("body")
    .off("change", "#orders_page .dt-checkboxes")
    .on("change", "#orders_page .dt-checkboxes", function () {
      var rows_selected = table.column(0).checkboxes.selected();
      $("#rows_selected").text(rows_selected.length);
    });

  $("body")
    .off("change", '#orders_page [name="checkbox-action"]')
    .on("change", '#orders_page [name="checkbox-action"]', function () {
      if ($(this).val() == 1) {
        $("#checkbox-status-block").show();
      } else {
        $("#checkbox-status-block").hide();
      }

      if ($(this).val() == 2) {
        $("#checkbox-message-template-block").show();
      } else {
        $("#checkbox-message-template-block").hide();
      }
    });

  $("body")
    .off("click", "#orders_page #selected_rows_submit")
    .on("click", "#orders_page #selected_rows_submit", function () {
      //123
    });

  $("body")
    .off("click", "#orders_page #clear-filters")
    .on("click", "#orders_page #clear-filters", function () {
      $("#forFilters input").val("").trigger("change");
    });

  $("body")
    .off("click", "#send_sms")
    .on("click", "#send_sms", function (event) {
      var rows = table.rows({ selected: true }).ids();

      if (rows.length > 0) {
        var sender = $('[name="turbo_sms_sender"]').val();

        $.each(rows, function (index, row) {
          var order = http_get("./api/order/" + row).response;

          var client_fio = order.client.fio.split(" ");
          var client_first_name = client_fio[0] ? client_fio[0] : "";
          var client_middle_name = client_fio[1] ? client_fio[1] : "";
          var client_last_name = client_fio[2] ? client_fio[2] : "";
          var summa = order.delivery.cost_product
            ? order.delivery.cost_product
            : "";
          var ttn = order.delivery.tnn ? order.delivery.tnn : "";
          var comment_ttn = order.delivery.comment
            ? order.delivery.comment
            : "";
          var cost_delievery = order.delivery.cost ? order.delivery.cost : "";

          var products = "";
          var product = order.products;
          product.forEach((element) => {
            products += element.name + ", ";
          });
          products = products.substring(0, products.length - 2);

          message_text = $('[name="turbo_sms_message"]')
            .val()
            .replace("{ttn}", ttn)
            .replace("{first_name}", client_first_name)
            .replace("{middle_name}", client_middle_name)
            .replace("{last_name}", client_last_name)
            .replace("{products}", products)
            .replace("{summa}", summa)
            .replace("{comment_ttn}", comment_ttn)
            .replace("{cost_delievery}", cost_delievery);

          var data = {
            sms_template:
              $('[name="turbo_sms_template"]').val() == 0
                ? ""
                : $('[name="turbo_sms_template"]').val(),
            order_id: order.order.id,
            phone: order.client.phone,
            text: message_text,
            sender: sender,
          };

          var response = http_post("./api/sms/send", data);
        });
      }

      swal({
        title: lang.order.swal_title_1,
        text: lang.orders.swal_text_9,
        type: "success",
        confirmButtonColor: "#607D8B",
      });
    });

  $("body")
    .off("dblclick", "#orders_table tbody tr")
    .on("dblclick", "#orders_table tbody tr", function () {
      var id = $(this).attr("id");
      var response = http_get("./api/order/" + id + "/min");

      if (response.status == 200) {
        if (
          (response.response.order.payment_received == 1 &&
            $.cookie("user.payment_received") == 1) ||
          (response.response.order.order_return == 1 &&
            $.cookie("user.order_return") == 1) ||
          response.response.order.order_return == 0
        ) {
          if (!empty(response.response.order.view_id)) {
            var view = http_get("./api/order/" + id + "/view").response.view;

            if (view == true) {
              app.setLocation("#/order/" + id);
            } else {
              swal({
                title: lang.orders.swal_title_2,
                text: lang.orders.swal_text_10+" " + response.response.order.view_name,
                confirmButtonColor: "#EF5350",
                type: "error",
              });
            }
          } else {
            app.setLocation("#/order/" + id);
          }
        } else {
          swal({
            title: lang.orders.swal_title_2,
            confirmButtonColor: "#EF5350",
            type: "error",
          });
        }
      }
    });

  $("body")
    .off("click", "#modal_order_comment input[name=save]")
    .on("click", "#modal_order_comment input[name=save]", function () {
      var data = {
        comment: $("#modal_order_comment textarea[name=comment]").val(),
      };

      var order_id = $("#modal_order_comment input[name=order_id]").val();

      http_post("./api/order/" + order_id + "/comment", data);

      $.jGrowl(lang.client.jGrowl_text_6, {
        header: lang.jGrowl.h_update,
        life: 10000,
        theme: "alert-styled-left bg-success",
      });

      table.ajax.reload(null, false);
    });

  $("body")
    .off("click", "#orders_page td.comment")
    .on("click", "#orders_page td.comment", function () {
      var order_id = $(this).closest("tr").attr("id");

      $("#modal_order_comment").modal("toggle");
      $("#modal_order_comment input[name=order_id]").val(order_id);

      var response = http_get("./api/order/" + order_id + "/comment");

      $("#modal_order_comment textarea[name=comment]").val(
        response.response.comment
      );
    });

  $("body")
    .off("click", '[name="np_info"]')
    .on("click", '[name="np_info"]', function (e) {
      let ttn = $(this).parent().text().trim();

      getNPinfo(ttn);
    });

  // $('body')
  //     .off('keydown', '[name="create_date_from"], [name="create_date_to"]')
  //     .on('keydown', '[name="create_date_from"], [name="create_date_to"]', function (e) {

  //         if(e.keyCode == 13){
  //             table.ajax.reload();
  //             saveordersfilters();
  //         }
  //     });

  // $('body')
  //     .off('keydown', '[name="update_date_from"], [name="update_date_to"]')
  //     .on('keydown', '[name="update_date_from"], [name="update_date_to"]', function (e) {

  //         if(e.keyCode == 13){

  //             table.ajax.reload();
  //             saveordersfilters();
  //         }
  //     });

  $("body")
    .off("click", "#arrow_left")
    .on("click", "#arrow_left", function () {
      $(".tabbable-wrapper").animate({ scrollLeft: "-=400" }, 200);
    });

  $("body")
    .off("click", "#arrow_right")
    .on("click", "#arrow_right", function () {
      $(".tabbable-wrapper").animate({ scrollLeft: "+=400" }, 200);
    });

  var old_x = 0;
  var old_scroll_left = 0;
  var mousedown = false;

  $("body")
    .off("mousedown", "#tabbable")
    .on("mousedown", "#tabbable", function (e) {
      old_x = e.clientX;
      old_scroll_left = $(".tabbable-wrapper").scrollLeft();
      mousedown = true;
    });

  $("body")
    .off("mouseup", "#container")
    .on("mouseup", "#container", function (e) {
      mousedown = false;
    });

  $("body")
    .off("mousemove", "#container")
    .on("mousemove", "#container", function (e) {
      if (mousedown) {
        $(".tabbable-wrapper").scrollLeft(
          old_scroll_left - (e.clientX - old_x)
        );
      }
    });

  // Выбрать все заказы
  $("body")
    .off("click", "#select_all")
    .on("click", "#select_all", function (e) {
      if (table.rows({ selected: true }).ids().length == table.rows().count()) {
        table.rows().deselect();
      } else {
        table.rows().select();
      }
    });

    /** выпадающее мню внутри меню */
    $("body")
        .off("click", ".dropdown-submenu")
        .on("click", ".dropdown-submenu", function (e) {
                e.stopPropagation();
                
                let l = $(this).find('.menu-side').eq(0).hasClass('openi')

                if($($(this).parents()[1]).hasClass('dropdown open'))
                {
                  $('.dropdown.open').find('.menu-side.openi').removeClass('openi')
                }

                if( !l ) {
                  $(this).find('.menu-side').eq(0).addClass('openi')
                } else {
                  $(this).find('.menu-side').eq(0).removeClass('openi')
                }
        });
});

function saveordersfilters() {
  $.cookie("orders_status_filter", filter_status);

  if($('[name="create_date_from"]').length > 0) {
    $.cookie("orders_create_date_from", $('[name="create_date_from"]').val());
    $.cookie("orders_create_date_to", $('[name="create_date_to"]').val());
  }
  
  if($('[name="update_date_from"]').length > 0) {
    $.cookie("orders_update_date_from", $('[name="update_date_from"]').val());
    $.cookie("orders_update_date_to", $('[name="update_date_to"]').val());
  }
}

function loadtfilters() {
  if (!empty($.cookie("orders_status_filter"))) {
    filter_status = $.cookie("orders_status_filter");
  }
  if (!empty($.cookie("orders_create_date_from"))) {
    $('[name="create_date_from"]').datepicker(
      "update",
      $.cookie("orders_create_date_from")
    );
  }
  if (!empty($.cookie("orders_create_date_to"))) {
    $('[name="create_date_to"]').datepicker(
      "update",
      $.cookie("orders_create_date_to")
    );
  }
  if (!empty($.cookie("orders_update_date_from"))) {
    $('[name="update_date_from"]').datepicker(
      "update",
      $.cookie("orders_update_date_from")
    );
  }
  if (!empty($.cookie("orders_update_date_to"))) {
    $('[name="update_date_to"]').datepicker(
      "update",
      $.cookie("orders_update_date_to")
    );
  }
}

var timer = {
  running: false,
  iv: 30000,
  timeout: false,
  cb: function () {},
  start: function (cb, iv) {
    var elm = this;
    clearInterval(this.timeout);
    this.running = true;
    if (cb) this.cb = cb;
    if (iv) this.iv = iv;
    this.timeout = setTimeout(function () {
      elm.execute(elm);
    }, this.iv * 1000);
  },
  execute: function (e) {
    if (!e.running) return false;
    e.cb();
    e.start();
  },
  stop: function () {
    this.running = false;
  },
  set_interval: function (iv) {
    clearInterval(this.timeout);
    this.start(false, iv * 1000);
  },
};

function cross_download(url, fileName) {
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.responseType = "blob";
  var __fileName = fileName;
  req.onload = function (event) {
      var blob = req.response;
      var contentType = req.getResponseHeader("content-type");
      if (window.navigator.msSaveOrOpenBlob) {
          // Internet Explorer
          window.navigator.msSaveOrOpenBlob(new Blob([blob], {type: contentType}), fileName);
      } else {
          var link = document.createElement('a');
          document.body.appendChild(link);
          link.download = __fileName;
          link.href = window.URL.createObjectURL(blob);
          link.click();
          document.body.removeChild(link); //remove the link when done
      }
  };
  req.send();
}

function updateStatusTab(statuses_tabs, filter_status) {

  http_get_async('./api/count_status_orders', null, (resp) => {

    if(Array.isArray(statuses_tabs)) return
    
    statuses_tabs.clearTabs();

    if ($.cookie("user.admin") == 'true') {
      statuses_tabs.addTab(
        '<span class="add-status glyphicon glyphicon-plus"><b style="font-family: sans-serif;"> '+lang.common.opt_create_status+'</b></span>'
      )
    }
  
    $.each(resp.response.orders_status_count.reverse(), function (item, value) {
      if (value.id != 32) {
        let bad_color = ['#fff', '#ffffff']

        if (
          value.style &&
          bad_color.includes(value.style.toLowerCase())
        ) {
          value.style = "#e6e6e6";
        }
        if (value.id == filter_status) {
          statuses_tabs.addTab(
            '<span class="status" order_status_id="' +
              value.id +
              '" style="font-size: 11px; border: #bbb; border-top: 6px solid ' +
              value.style +
              '; background-color: white;">' +
              value.name +
              ": <b>" +
              (parseInt(value.count) || 0) +
              "</b></span>",
            0
          );
        } else {
          statuses_tabs.addTab(
            '<span class="status" order_status_id="' +
              value.id +
              '" style="font-size: 11px; border: #bbb; border-top: 6px solid ' +
              value.style +
              '; background-color: #eee;">' +
              value.name +
              ": <b>" +
              (parseInt(value.count) || 0) +
              "</b></span>",
            0
          );
        }
      }
    });
  })
}

function createFilterLabelBody (count_filter) {
  return "<span> <button name='count_filter' class ='btn btn-green' id = 'delete_filter' flow='down' tooltip='"+lang.orders.tooltip_1+"' > "+lang.orders.text_26+": "+ count_filter +"</button></span>"
}
