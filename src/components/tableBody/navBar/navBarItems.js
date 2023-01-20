import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


export const mainNavBarItem = [
    {
        id: 'homeBar',
        item: <HomeOutlinedIcon />,
        label: 'Головна',
        route: 'homebar'
    },    {
        id: 'users',
        item: <PeopleAltOutlinedIcon/>,
        label: 'Користувачі',
        route: 'users',
        child:[{id: 'users',text: 'Користувачі', route: 'users',}, 
        {id: 'storage', text:'Магазини', route: 'stores',},
        {id: 'user_groups', text:'Групи користувачів', route: 'stores',} ]
    },    {
        id: 'orders',
        item: <BookmarksOutlinedIcon/>,
        label: 'Замовлення',
        route: 'orders',
        child:[{id: 'orders', text: 'Замовлення', route: 'orders',},
         {id: 'clients', text:'Клієнти', route: 'clients',},
          {id: 'basket', text:'Корзина', route: 'basket',}]
    },    {
        id: 'products',
        item:  <UnarchiveOutlinedIcon/>,
        label: 'Товари',
        route: 'products',
        child:[{id: 'products', text: 'Товари', route: 'products', },
         {id: 'attributes', text:'Атрибути', route: 'products',}, 
         {id: 'consignments', text:'Товарні накладні', route: 'products',},
        {id: 'suppliers', text: 'Постачальники', route: 'products', },
         {id: 'scripts', text:'Скрипти', route: 'products',} , 
         {id: 'purchase', text:'Закупка', route: 'products',}]
    },    {
        id: 'delivery',
        item: <CalendarMonthOutlinedIcon/>,
        label: 'Доставка',
        route: 'delivery',
        child:[{id: 'novaposhta', text: 'Нова Пошта',route: 'delivery' }, 
                {id: 'ukrposhta', text:'УкрПошта', route: 'delivery',},
                {id: 'justin', text:'Justin',route: 'delivery',},
                 {id: 'control_shipments', text:'Контроль відправок', route: 'delivery',}]
    },    {
        id: 'calls',
        item: <PhoneEnabledOutlinedIcon/>,
        label: 'Дзвінки',
        route: 'calls',
        child:[{id: 'calls', text: 'Дзвінки',route: 'calls' }, 
                {id: 'unitalk', text:'UniTalk', route: 'calls',} ]
    },    {
        id: 'message',
        item: <MarkEmailUnreadOutlinedIcon/>,
        label: 'Повідомлення',
        route: 'message',
        child:[{id: 'sms', text: 'SMS', route: 'message',}, 
              {id: 'chats', text:'Instagram Чат', route: 'chats',} ,
             {id: 'echat', text:'Viber Чат', route: 'echat',}]
    },    {
        id: 'analytics',
        item: <BarChartOutlinedIcon/>,
        label: 'Аналітика',
        route: 'analytics',
        child:[{id: 'analytics', text: 'Аналітика', route: 'analytics',},
                {id: 'daily_monitoring', text:'Аналітика по дням', route: 'analytics',} ,
                  {id: 'balance', text:'Баланс', route: 'analytics',},
                {id: 'fixed_expenses', text:'Постійні витрати', route: 'analytics',} ,
                 {id: 'rates', text:'Ставка', route: 'analytics',}]
    },    {
        id: 'settings',
        item: <SettingsSuggestOutlinedIcon/>,
        label: 'Налаштування',
        route: 'settings',
        child:[{id: 'settings', text: 'Налаштування', route: 'settings',}, 
                {id: 'status_matrix', text:'Мтриця статусів', route: 'settings',} , 
                {id: 'hystory', text:'Історія', route: 'settings',}]
    },    {
        id: 'faq',
        item: <InfoOutlinedIcon/>,
        label: 'FAQ',
        route: 'faq'
    },    {
        id: 'purchase',
        item: <ShoppingCartOutlinedIcon/>,
        label: 'Закупівлі',
        route: 'purchase'
    },    {
        id: 'help',
        item: <PhoneInTalkOutlinedIcon/>,
        label: 'Допомога',
        route: 'help'
    },
    // {
    //     id: 'order',
    //     label: 'order',
    //     route: 'order'
    // },
]


// "nav_prom_accounts":"1",
