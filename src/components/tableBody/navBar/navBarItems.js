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
        route: 'users'
    },    {
        id: 'orders',
        item: <BookmarksOutlinedIcon/>,
        label: 'Замовлення',
        route: 'orders'
    },    {
        id: 'products',
        item:  <UnarchiveOutlinedIcon/>,
        label: 'Товари',
        route: 'products'
    },    {
        id: 'delivery',
        item: <CalendarMonthOutlinedIcon/>,
        label: 'Доставка',
        route: 'delivery'
    },    {
        id: 'calls',
        item: <PhoneEnabledOutlinedIcon/>,
        label: 'Дзвінки',
        route: 'calls'
    },    {
        id: 'message',
        item: <MarkEmailUnreadOutlinedIcon/>,
        label: 'Повідомлення',
        route: 'message'
    },    {
        id: 'analytics',
        item: <BarChartOutlinedIcon/>,
        label: 'Аналітика',
        route: 'analytics'
    },    {
        id: 'settings',
        item: <SettingsSuggestOutlinedIcon/>,
        label: 'Налаштування',
        route: 'settings'
    },    {
        id: 'faq',
        item: <InfoOutlinedIcon/>,
        label: 'FAQ',
        route: 'faq'
    },    {
        id: 'purchasing',
        item: <ShoppingCartOutlinedIcon/>,
        label: 'Закупівлі',
        route: 'purchasing'
    },    {
        id: 'help',
        item: <PhoneInTalkOutlinedIcon/>,
        label: 'Допомога',
        route: 'help'
    },
    {
        id: 'order',
        label: 'order',
        route: 'order'
    },
]

