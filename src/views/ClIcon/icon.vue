<template>
  <div id="printArea" class="flex-column-page-wrap pageWrap">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">CrystalIcon 组件</h1>
        <p class="page-description">基于 Element Plus 图标组件的二次封装，提供更丰富的功能和更好的用户体验</p>
      </div>
    </div>

    <!-- 基础使用案例 -->
    <el-row :gutter="24">
      <el-col :xs="24">
        <div class="input-group">
          <div class="icon-category">
            <h4>基础图标</h4>
            <div class="icon-grid">
              <crystal-icon icon="Plus" size="24" color="#1890ff" />
              <crystal-icon icon="Minus" size="24" color="#ff4d4f" />
              <crystal-icon icon="CirclePlus" size="24" color="#52c41a" />
              <crystal-icon icon="Search" size="24" color="#faad14" />
              <crystal-icon icon="Female" size="24" color="#1890ff" />
              <crystal-icon icon="Male" size="24" color="#ff4d4f" />
              <crystal-icon icon="Aim" size="24" color="#52c41a" />
              <crystal-icon icon="House" size="24" color="#faad14" />
              <crystal-icon icon="FullScreen" size="24" color="#1890ff" />
              <crystal-icon icon="Loading" size="24" color="#ff4d4f" />
              <crystal-icon icon="Link" size="24" color="#52c41a" />
              <crystal-icon icon="Service" size="24" color="#faad14" />
              <crystal-icon icon="Pointer" size="24" color="#1890ff" />
              <crystal-icon icon="Star" size="24" color="#ff4d4f" />
              <crystal-icon icon="Notification" size="24" color="#52c41a" />
              <crystal-icon icon="Connection" size="24" color="#faad14" />
              <crystal-icon icon="ChatDotRound" size="24" color="#1890ff" />
              <crystal-icon icon="Setting" size="24" color="#ff4d4f" />
              <crystal-icon icon="Clock" size="24" color="#52c41a" />
              <crystal-icon icon="Position" size="24" color="#faad14" />
              <crystal-icon icon="Discount" size="24" color="#1890ff" />
              <crystal-icon icon="Odometer" size="24" color="#ff4d4f" />
              <crystal-icon icon="ChatSquare" size="24" color="#52c41a" />
              <crystal-icon icon="ChatRound" size="24" color="#faad14" />
              <crystal-icon icon="ChatLineRound" size="24" color="#1890ff" />
              <crystal-icon icon="ChatLineSquare" size="24" color="#ff4d4f" />
              <crystal-icon icon="ChatDotSquare" size="24" color="#52c41a" />
              <crystal-icon icon="View" size="24" color="#faad14" />
              <crystal-icon icon="Hide" size="24" color="#1890ff" />
              <crystal-icon icon="Unlock" size="24" color="#ff4d4f" />
              <crystal-icon icon="Lock" size="24" color="#52c41a" />
              <crystal-icon icon="RefreshRight" size="24" color="#faad14" />
              <crystal-icon icon="RefreshLeft" size="24" color="#1890ff" />
              <crystal-icon icon="Refresh" size="24" color="#ff4d4f" />
              <crystal-icon icon="Bell" size="24" color="#52c41a" />
              <crystal-icon icon="MuteNotification" size="24" color="#faad14" />
              <crystal-icon icon="User" size="24" color="#1890ff" />
              <crystal-icon icon="Check" size="24" color="#ff4d4f" />
              <crystal-icon icon="CircleCheck" size="24" color="#52c41a" />
              <crystal-icon icon="Warning" size="24" color="#faad14" />
              <crystal-icon icon="CircleClose" size="24" color="#1890ff" />
              <crystal-icon icon="Close" size="24" color="#ff4d4f" />
              <crystal-icon icon="PieChart" size="24" color="#52c41a" />
              <crystal-icon icon="More" size="24" color="#faad14" />
              <crystal-icon icon="Compass" size="24" color="#1890ff" />
              <crystal-icon icon="Filter" size="24" color="#ff4d4f" />
              <crystal-icon icon="Switch" size="24" color="#52c41a" />
              <crystal-icon icon="Select" size="24" color="#faad14" />
              <crystal-icon icon="SemiSelect" size="24" color="#1890ff" />
              <crystal-icon icon="CloseBold" size="24" color="#ff4d4f" />
              <crystal-icon icon="EditPen" size="24" color="#52c41a" />
              <crystal-icon icon="Edit" size="24" color="#faad14" />
              <crystal-icon icon="Message" size="24" color="#1890ff" />
              <crystal-icon icon="MessageBox" size="24" color="#ff4d4f" />
              <crystal-icon icon="TurnOff" size="24" color="#52c41a" />
              <crystal-icon icon="Finished" size="24" color="#faad14" />
              <crystal-icon icon="Delete" size="24" color="#1890ff" />
              <crystal-icon icon="Crop" size="24" color="#ff4d4f" />
              <crystal-icon icon="SwitchButton" size="24" color="#52c41a" />
              <crystal-icon icon="Operation" size="24" color="#faad14" />
              <crystal-icon icon="Open" size="24" color="#1890ff" />
              <crystal-icon icon="Remove" size="24" color="#ff4d4f" />
              <crystal-icon icon="ZoomOut" size="24" color="#52c41a" />
              <crystal-icon icon="ZoomIn" size="24" color="#faad14" />
              <crystal-icon icon="InfoFilled" size="24" color="#1890ff" />
              <crystal-icon icon="CircleCheckFilled" size="24" color="#ff4d4f" />
              <crystal-icon icon="SuccessFilled" size="24" color="#52c41a" />
              <crystal-icon icon="WarningFilled" size="24" color="#faad14" />
              <crystal-icon icon="CircleCloseFilled" size="24" color="#1890ff" />
              <crystal-icon icon="QuestionFilled" size="24" color="#ff4d4f" />
              <crystal-icon icon="WarnTriangleFilled" size="24" color="#52c41a" />
              <crystal-icon icon="UserFilled" size="24" color="#faad14" />
              <crystal-icon icon="MoreFilled" size="24" color="#1890ff" />
              <crystal-icon icon="Tools" size="24" color="#ff4d4f" />
              <crystal-icon icon="HomeFilled" size="24" color="#52c41a" />
              <crystal-icon icon="Menu" size="24" color="#faad14" />
              <crystal-icon icon="UploadFilled" size="24" color="#1890ff" />
              <crystal-icon icon="Avatar" size="24" color="#ff4d4f" />
              <crystal-icon icon="HelpFilled" size="24" color="#52c41a" />
              <crystal-icon icon="Share" size="24" color="#faad14" />
              <crystal-icon icon="StarFilled" size="24" color="#1890ff" />
              <crystal-icon icon="Comment" size="24" color="#ff4d4f" />
              <crystal-icon icon="Histogram" size="24" color="#52c41a" />
              <crystal-icon icon="Grid" size="24" color="#faad14" />
              <crystal-icon icon="Promotion" size="24" color="#1890ff" />
              <crystal-icon icon="DeleteFilled" size="24" color="#ff4d4f" />
              <crystal-icon icon="RemoveFilled" size="24" color="#52c41a" />
              <crystal-icon icon="CirclePlusFilled" size="24" color="#faad14" />
            </div>
          </div>

          <div class="icon-category">
            <h4>箭头图标</h4>
            <div class="icon-grid">
              <crystal-icon icon="Arrow" size="24" color="#1890ff" />
              <crystal-icon icon="ArrowLeft" size="24" color="#ff4d4f" />
              <crystal-icon icon="ArrowUp" size="24" color="#52c41a" />
              <crystal-icon icon="ArrowRight" size="24" color="#faad14" />
              <crystal-icon icon="ArrowDown" size="24" color="#1890ff" />
              <crystal-icon icon="ArrowLeftBold" size="24" color="#ff4d4f" />
              <crystal-icon icon="ArrowUpBold" size="24" color="#52c41a" />
              <crystal-icon icon="ArrowRightBold" size="24" color="#faad14" />
              <crystal-icon icon="ArrowDownBold" size="24" color="#1890ff" />
              <crystal-icon icon="DArrowRight" size="24" color="#ff4d4f" />
              <crystal-icon icon="DArrowLeft" size="24" color="#52c41a" />
              <crystal-icon icon="Download" size="24" color="#faad14" />
              <crystal-icon icon="Upload" size="24" color="#1890ff" />
              <crystal-icon icon="Top" size="24" color="#ff4d4f" />
              <crystal-icon icon="Bottom" size="24" color="#52c41a" />
              <crystal-icon icon="Back" size="24" color="#faad14" />
              <crystal-icon icon="Right" size="24" color="#1890ff" />
              <crystal-icon icon="TopRight" size="24" color="#ff4d4f" />
              <crystal-icon icon="TopLeft" size="24" color="#52c41a" />
              <crystal-icon icon="BottomRight" size="24" color="#faad14" />
              <crystal-icon icon="BottomLeft" size="24" color="#1890ff" />
              <crystal-icon icon="Sort" size="24" color="#ff4d4f" />
              <crystal-icon icon="SortUp" size="24" color="#52c41a" />
              <crystal-icon icon="SortDown" size="24" color="#faad14" />
              <crystal-icon icon="Rank" size="24" color="#1890ff" />
              <crystal-icon icon="CaretLeft" size="24" color="#ff4d4f" />
              <crystal-icon icon="CaretTop" size="24" color="#52c41a" />
              <crystal-icon icon="CaretRight" size="24" color="#faad14" />
              <crystal-icon icon="CaretBottom" size="24" color="#1890ff" />
              <crystal-icon icon="DCaret" size="24" color="#ff4d4f" />
              <crystal-icon icon="Expand" size="24" color="#52c41a" />
              <crystal-icon icon="Fold" size="24" color="#faad14" />
            </div>
          </div>

          <div class="icon-category">
            <h4>状态图标</h4>
            <div class="icon-grid">
              <crystal-icon icon="Success" size="24" color="#52c41a" />
              <crystal-icon icon="Warning" size="24" color="#faad14" />
              <crystal-icon icon="Error" size="24" color="#ff4d4f" />
              <crystal-icon icon="Info" size="24" color="#1890ff" />
              <crystal-icon icon="Check" size="24" color="#52c41a" />
              <crystal-icon icon="Close" size="24" color="#ff4d4f" />
              <crystal-icon icon="Minus" size="24" color="#1890ff" />
              <crystal-icon icon="Plus" size="24" color="#52c41a" />
              <crystal-icon icon="Question" size="24" color="#1890ff" />
              <crystal-icon icon="Help" size="24" color="#ff4d4f" />
              <crystal-icon icon="Loading" size="24" color="#1890ff" />
              <crystal-icon icon="Clock" size="24" color="#faad14" />
              <crystal-icon icon="Calendar" size="24" color="#52c41a" />
            </div>
          </div>

          <div class="icon-category">
            <h4>社交图标</h4>
            <div class="icon-grid">
              <crystal-icon icon="User" size="24" color="#1890ff" />
              <crystal-icon icon="User" size="24" color="#ff4d4f" />
              <crystal-icon icon="Users" size="24" color="#52c41a" />
              <crystal-icon icon="Message" size="24" color="#faad14" />
              <crystal-icon icon="ChatDotRound" size="24" color="#1890ff" />
              <crystal-icon icon="Mail" size="24" color="#ff4d4f" />
              <crystal-icon icon="Phone" size="24" color="#52c41a" />
              <crystal-icon icon="Star" size="24" color="#faad14" />
              <crystal-icon icon="StarFilled" size="24" color="#1890ff" />
              <crystal-icon icon="Heart" size="24" color="#ff4d4f" />
              <crystal-icon icon="HeartFilled" size="24" color="#52c41a" />
              <crystal-icon icon="Like" size="24" color="#faad14" />
              <crystal-icon icon="Dislike" size="24" color="#1890ff" />
            </div>
          </div>

          <div class="icon-category">
            <h4>文件图标</h4>
            <div class="icon-grid">
              <crystal-icon icon="Document" size="24" color="#1890ff" />
              <crystal-icon icon="DocumentAdd" size="24" color="#ff4d4f" />
              <crystal-icon icon="Document" size="24" color="#52c41a" />
              <crystal-icon icon="Notebook" size="24" color="#faad14" />
              <crystal-icon icon="Tickets" size="24" color="#1890ff" />
              <crystal-icon icon="Memo" size="24" color="#ff4d4f" />
              <crystal-icon icon="Collection" size="24" color="#52c41a" />
              <crystal-icon icon="Postcard" size="24" color="#faad14" />
              <crystal-icon icon="ScaleToOriginal" size="24" color="#1890ff" />
              <crystal-icon icon="SetUp" size="24" color="#ff4d4f" />
              <crystal-icon icon="DocumentDelete" size="24" color="#52c41a" />
              <crystal-icon icon="DocumentChecked" size="24" color="#faad14" />
              <crystal-icon icon="DataBoard" size="24" color="#1890ff" />
              <crystal-icon icon="DataAnalysis" size="24" color="#ff4d4f" />
              <crystal-icon icon="CopyDocument" size="24" color="#52c41a" />
              <crystal-icon icon="FolderChecked" size="24" color="#faad14" />
              <crystal-icon icon="Files" size="24" color="#1890ff" />
              <crystal-icon icon="Folder" size="24" color="#ff4d4f" />
              <crystal-icon icon="FolderDelete" size="24" color="#52c41a" />
              <crystal-icon icon="FolderRemove" size="24" color="#faad14" />
              <crystal-icon icon="FolderOpened" size="24" color="#1890ff" />
              <crystal-icon icon="DocumentCopy" size="24" color="#ff4d4f" />
              <crystal-icon icon="DocumentRemove" size="24" color="#52c41a" />
              <crystal-icon icon="FolderAdd" size="24" color="#faad14" />
              <crystal-icon icon="FirstAidKit" size="24" color="#1890ff" />
              <crystal-icon icon="Reading" size="24" color="#ff4d4f" />
              <crystal-icon icon="DataLine" size="24" color="#52c41a" />
              <crystal-icon icon="Management" size="24" color="#faad14" />
              <crystal-icon icon="Checked" size="24" color="#1890ff" />
              <crystal-icon icon="Ticket" size="24" color="#ff4d4f" />
              <crystal-icon icon="Failed" size="24" color="#52c41a" />
              <crystal-icon icon="TrendCharts" size="24" color="#faad14" />
              <crystal-icon icon="List" size="24" color="#1890ff" />
            </div>
          </div>

          <div class="icon-category">
            <h4>媒体图标</h4>
            <div class="icon-grid">
              <crystal-icon icon="Media" size="24" color="#1890ff" />
              <crystal-icon icon="Microphone" size="24" color="#ff4d4f" />
              <crystal-icon icon="Mute" size="24" color="#52c41a" />
              <crystal-icon icon="Mic" size="24" color="#faad14" />
              <crystal-icon icon="VideoPause" size="24" color="#1890ff" />
              <crystal-icon icon="VideoCamera" size="24" color="#ff4d4f" />
              <crystal-icon icon="VideoPlay" size="24" color="#52c41a" />
              <crystal-icon icon="Headset" size="24" color="#faad14" />
              <crystal-icon icon="Monitor" size="24" color="#1890ff" />
              <crystal-icon icon="Film" size="24" color="#ff4d4f" />
              <crystal-icon icon="Camera" size="24" color="#52c41a" />
              <crystal-icon icon="Picture" size="24" color="#faad14" />
              <crystal-icon icon="PictureRounded" size="24" color="#1890ff" />
              <crystal-icon icon="Iphone" size="24" color="#ff4d4f" />
              <crystal-icon icon="Cellphone" size="24" color="#52c41a" />
              <crystal-icon icon="VideoCameraFilled" size="24" color="#faad14" />
              <crystal-icon icon="PictureFilled" size="24" color="#1890ff" />
              <crystal-icon icon="Platform" size="24" color="#ff4d4f" />
              <crystal-icon icon="CameraFilled" size="24" color="#52c41a" />
              <crystal-icon icon="BellFilled" size="24" color="#faad14" />
            </div>
          </div>

          <div class="icon-category">
            <h4>位置图标</h4>
            <div class="icon-grid">
              <crystal-icon icon="Traffic" size="24" color="#1890ff" />
              <crystal-icon icon="Location" size="24" color="#ff4d4f" />
              <crystal-icon icon="LocationInformation" size="24" color="#52c41a" />
              <crystal-icon icon="DeleteLocation" size="24" color="#faad14" />
              <crystal-icon icon="Coordinate" size="24" color="#1890ff" />
              <crystal-icon icon="Bicycle" size="24" color="#ff4d4f" />
              <crystal-icon icon="OfficeBuilding" size="24" color="#52c41a" />
              <crystal-icon icon="School" size="24" color="#faad14" />
              <crystal-icon icon="Guide" size="24" color="#1890ff" />
              <crystal-icon icon="AddLocation" size="24" color="#ff4d4f" />
              <crystal-icon icon="MapLocation" size="24" color="#52c41a" />
              <crystal-icon icon="Place" size="24" color="#faad14" />
              <crystal-icon icon="LocationFilled" size="24" color="#1890ff" />
              <crystal-icon icon="Van" size="24" color="#ff4d4f" />
            </div>
          </div>

          <div class="icon-category">
            <h4>美食图标</h4>
            <div class="icon-grid">
              <crystal-icon icon="Food" size="24" color="#1890ff" />
              <crystal-icon icon="Watermelon" size="24" color="#ff4d4f" />
              <crystal-icon icon="Pear" size="24" color="#52c41a" />
              <crystal-icon icon="NoSmoking" size="24" color="#faad14" />
              <crystal-icon icon="Smoking" size="24" color="#1890ff" />
              <crystal-icon icon="Mug" size="24" color="#ff4d4f" />
              <crystal-icon icon="GobletSquareFull" size="24" color="#52c41a" />
              <crystal-icon icon="GobletFull" size="24" color="#faad14" />
              <crystal-icon icon="KnifeFork" size="24" color="#1890ff" />
              <crystal-icon icon="Sugar" size="24" color="#ff4d4f" />
              <crystal-icon icon="Bowl" size="24" color="#52c41a" />
              <crystal-icon icon="MilkTea" size="24" color="#faad14" />
              <crystal-icon icon="Lollipop" size="24" color="#1890ff" />
              <crystal-icon icon="Coffee" size="24" color="#ff4d4f" />
              <crystal-icon icon="Chicken" size="24" color="#52c41a" />
              <crystal-icon icon="Dish" size="24" color="#faad14" />
              <crystal-icon icon="IceTea" size="24" color="#1890ff" />
              <crystal-icon icon="ColdDrink" size="24" color="#ff4d4f" />
              <crystal-icon icon="CoffeeCup" size="24" color="#52c41a" />
              <crystal-icon icon="DishDot" size="24" color="#faad14" />
              <crystal-icon icon="IceDrink" size="24" color="#1890ff" />
              <crystal-icon icon="IceCream" size="24" color="#ff4d4f" />
              <crystal-icon icon="Dessert" size="24" color="#52c41a" />
              <crystal-icon icon="IceCreamSquare" size="24" color="#faad14" />
              <crystal-icon icon="ForkSpoon" size="24" color="#1890ff" />
              <crystal-icon icon="IceCreamRound" size="24" color="#ff4d4f" />
              <crystal-icon icon="Food" size="24" color="#52c41a" />
              <crystal-icon icon="HotWater" size="24" color="#faad14" />
              <crystal-icon icon="Grape" size="24" color="#1890ff" />
              <crystal-icon icon="Fries" size="24" color="#ff4d4f" />
              <crystal-icon icon="Apple" size="24" color="#52c41a" />
              <crystal-icon icon="Burger" size="24" color="#faad14" />
              <crystal-icon icon="Goblet" size="24" color="#1890ff" />
              <crystal-icon icon="GobletSquare" size="24" color="#ff4d4f" />
              <crystal-icon icon="Orange" size="24" color="#52c41a" />
              <crystal-icon icon="Cherry" size="24" color="#faad14" />
            </div>
          </div>

          <div class="icon-category">
            <h4>工具图标</h4>
            <div class="icon-grid">
              <crystal-icon icon="Items" size="24" color="#1890ff" />
              <crystal-icon icon="Printer" size="24" color="#ff4d4f" />
              <crystal-icon icon="Calendar" size="24" color="#52c41a" />
              <crystal-icon icon="CreditCard" size="24" color="#faad14" />
              <crystal-icon icon="Box" size="24" color="#1890ff" />
              <crystal-icon icon="Money" size="24" color="#ff4d4f" />
              <crystal-icon icon="Refrigerator" size="24" color="#52c41a" />
              <crystal-icon icon="Cpu" size="24" color="#faad14" />
              <crystal-icon icon="Football" size="24" color="#1890ff" />
              <crystal-icon icon="Brush" size="24" color="#ff4d4f" />
              <crystal-icon icon="Suitcase" size="24" color="#52c41a" />
              <crystal-icon icon="SuitcaseLine" size="24" color="#faad14" />
              <crystal-icon icon="Umbrella" size="24" color="#1890ff" />
              <crystal-icon icon="AlarmClock" size="24" color="#ff4d4f" />
              <crystal-icon icon="Medal" size="24" color="#52c41a" />
              <crystal-icon icon="GoldMedal" size="24" color="#faad14" />
              <crystal-icon icon="Present" size="24" color="#1890ff" />
              <crystal-icon icon="Mouse" size="24" color="#ff4d4f" />
              <crystal-icon icon="Watch" size="24" color="#52c41a" />
              <crystal-icon icon="QuartzWatch" size="24" color="#faad14" />
              <crystal-icon icon="Magnet" size="24" color="#1890ff" />
              <crystal-icon icon="Help" size="24" color="#ff4d4f" />
              <crystal-icon icon="Soccer" size="24" color="#52c41a" />
              <crystal-icon icon="ToiletPaper" size="24" color="#faad14" />
              <crystal-icon icon="ReadingLamp" size="24" color="#1890ff" />
              <crystal-icon icon="Paperclip" size="24" color="#ff4d4f" />
              <crystal-icon icon="MagicStick" size="24" color="#52c41a" />
              <crystal-icon icon="Basketball" size="24" color="#faad14" />
              <crystal-icon icon="Baseball" size="24" color="#1890ff" />
              <crystal-icon icon="Coin" size="24" color="#ff4d4f" />
              <crystal-icon icon="Goods" size="24" color="#52c41a" />
              <crystal-icon icon="Sell" size="24" color="#faad14" />
              <crystal-icon icon="SoldOut" size="24" color="#1890ff" />
              <crystal-icon icon="Key" size="24" color="#ff4d4f" />
              <crystal-icon icon="ShoppingCart" size="24" color="#52c41a" />
              <crystal-icon icon="ShoppingCartFull" size="24" color="#faad14" />
              <crystal-icon icon="ShoppingTrolley" size="24" color="#1890ff" />
              <crystal-icon icon="Phone" size="24" color="#ff4d4f" />
              <crystal-icon icon="Scissor" size="24" color="#52c41a" />
              <crystal-icon icon="Handbag" size="24" color="#faad14" />
              <crystal-icon icon="ShoppingBag" size="24" color="#1890ff" />
              <crystal-icon icon="Trophy" size="24" color="#ff4d4f" />
              <crystal-icon icon="TrophyBase" size="24" color="#52c41a" />
              <crystal-icon icon="Stopwatch" size="24" color="#faad14" />
              <crystal-icon icon="Timer" size="24" color="#1890ff" />
              <crystal-icon icon="CollectionTag" size="24" color="#ff4d4f" />
              <crystal-icon icon="TakeawayBox" size="24" color="#52c41a" />
              <crystal-icon icon="PriceTag" size="24" color="#faad14" />
              <crystal-icon icon="Wallet" size="24" color="#1890ff" />
              <crystal-icon icon="Opportunity" size="24" color="#ff4d4f" />
              <crystal-icon icon="PhoneFilled" size="24" color="#52c41a" />
              <crystal-icon icon="WalletFilled" size="24" color="#faad14" />
              <crystal-icon icon="GoodsFilled" size="24" color="#1890ff" />
              <crystal-icon icon="Flag" size="24" color="#ff4d4f" />
              <crystal-icon icon="BrushFilled" size="24" color="#52c41a" />
              <crystal-icon icon="Briefcase" size="24" color="#faad14" />
              <crystal-icon icon="Stamp" size="24" color="#1890ff" />
            </div>
          </div>

          <div class="icon-category">
            <h4>天气图标</h4>
            <div class="icon-grid">
              <crystal-icon icon="Weather" size="24" color="#1890ff" />
              <crystal-icon icon="Sunrise" size="24" color="#ff4d4f" />
              <crystal-icon icon="Sunny" size="24" color="#52c41a" />
              <crystal-icon icon="Ship" size="24" color="#faad14" />
              <crystal-icon icon="MostlyCloudy" size="24" color="#1890ff" />
              <crystal-icon icon="PartlyCloudy" size="24" color="#ff4d4f" />
              <crystal-icon icon="Sunset" size="24" color="#52c41a" />
              <crystal-icon icon="Drizzling" size="24" color="#faad14" />
              <crystal-icon icon="Pouring" size="24" color="#1890ff" />
              <crystal-icon icon="Cloudy" size="24" color="#ff4d4f" />
              <crystal-icon icon="Moon" size="24" color="#52c41a" />
              <crystal-icon icon="MoonNight" size="24" color="#faad14" />
              <crystal-icon icon="Lightning" size="24" color="#1890ff" />
            </div>
          </div>

          <div class="icon-category">
            <h4>其他图标</h4>
            <div class="icon-grid">
              <crystal-icon icon="ChromeFilled" size="24" color="#1890ff" />
              <crystal-icon icon="Eleme" size="24" color="#ff4d4f" />
              <crystal-icon icon="ElemeFilled" size="24" color="#52c41a" />
              <crystal-icon icon="ElementPlus" size="24" color="#faad14" />
              <crystal-icon icon="Shop" size="24" color="#1890ff" />
              <crystal-icon icon="SwitchFilled" size="24" color="#ff4d4f" />
              <crystal-icon icon="WindPower" size="24" color="#52c41a" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24" style="margin-top: 24px">
      <el-col :xs="24" :sm="12" :md="8" :lg="12">
        <div class="input-group">
          <h4>自定义内容</h4>
          <div class="icon-grid">
            <crystal-icon size="48">
              <div class="custom-icon">🎉</div>
            </crystal-icon>
            <crystal-icon size="48">
              <svg viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" stroke="#1890ff" stroke-width="2" />
                <text x="50" y="55" font-size="24" text-anchor="middle" fill="#1890ff">自定义</text>
              </svg>
            </crystal-icon>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 组件属性表格 -->
    <el-row :gutter="24">
      <el-col :xs="24">
        <div class="input-group">
          <h3>组件属性</h3>
          <BasicTable
            :table-data="propsTableData"
            :columns="propsColumns"
            basic-height="400px"
            :border="true"
            :stripe="true"
            :show-pagination="false"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 图标名称表格 -->
    <el-row :gutter="24">
      <el-col :xs="24">
        <div class="input-group">
          <h3>图标名称</h3>
          <BasicTable
            :table-data="iconNamesTableData"
            :columns="iconNamesColumns"
            basic-height="600px"
            :border="true"
            :stripe="true"
            :show-pagination="true"
            :page-size="20"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { CrystalIcon } from "crystalplus-ui"
import BasicTable from "@/components/BasicTable/BasicTable.vue"

// 属性表格数据
const propsTableData = ref([
  { prop: "icon", description: "Element Plus 图标名称", type: "String", default: "-" },
  { prop: "size", description: "图标大小", type: "Number/String", default: "'default'" },
  { prop: "color", description: "图标颜色", type: "String", default: "'#333'" },
  { prop: "animate", description: "是否启用动画效果", type: "Boolean", default: "false" },
  { prop: "animateType", description: "动画类型", type: "String", default: "'rotate'" }
])

// 属性表格列
const propsColumns = ref([
  { label: "属性", prop: "prop", width: "150" },
  { label: "描述", prop: "description" },
  { label: "类型", prop: "type", width: "100" },
  { label: "默认值", prop: "default", width: "200" }
])

// 图标名称表格数据
const iconNamesTableData = ref([
  { name: "Plus", category: "基础图标" },
  { name: "Minus", category: "基础图标" },
  { name: "CirclePlus", category: "基础图标" },
  { name: "Search", category: "基础图标" },
  { name: "Female", category: "基础图标" },
  { name: "Male", category: "基础图标" },
  { name: "Aim", category: "基础图标" },
  { name: "House", category: "基础图标" },
  { name: "FullScreen", category: "基础图标" },
  { name: "Loading", category: "基础图标" },
  { name: "Link", category: "基础图标" },
  { name: "Service", category: "基础图标" },
  { name: "Pointer", category: "基础图标" },
  { name: "Star", category: "基础图标" },
  { name: "Notification", category: "基础图标" },
  { name: "Connection", category: "基础图标" },
  { name: "ChatDotRound", category: "基础图标" },
  { name: "Setting", category: "基础图标" },
  { name: "Clock", category: "基础图标" },
  { name: "Position", category: "基础图标" },
  { name: "Discount", category: "基础图标" },
  { name: "Odometer", category: "基础图标" },
  { name: "ChatSquare", category: "基础图标" },
  { name: "ChatRound", category: "基础图标" },
  { name: "ChatLineRound", category: "基础图标" },
  { name: "ChatLineSquare", category: "基础图标" },
  { name: "ChatDotSquare", category: "基础图标" },
  { name: "View", category: "基础图标" },
  { name: "Hide", category: "基础图标" },
  { name: "Unlock", category: "基础图标" },
  { name: "Lock", category: "基础图标" },
  { name: "RefreshRight", category: "基础图标" },
  { name: "RefreshLeft", category: "基础图标" },
  { name: "Refresh", category: "基础图标" },
  { name: "Bell", category: "基础图标" },
  { name: "MuteNotification", category: "基础图标" },
  { name: "User", category: "基础图标" },
  { name: "Check", category: "基础图标" },
  { name: "CircleCheck", category: "基础图标" },
  { name: "Warning", category: "基础图标" },
  { name: "CircleClose", category: "基础图标" },
  { name: "Close", category: "基础图标" },
  { name: "PieChart", category: "基础图标" },
  { name: "More", category: "基础图标" },
  { name: "Compass", category: "基础图标" },
  { name: "Filter", category: "基础图标" },
  { name: "Switch", category: "基础图标" },
  { name: "Select", category: "基础图标" },
  { name: "SemiSelect", category: "基础图标" },
  { name: "CloseBold", category: "基础图标" },
  { name: "EditPen", category: "基础图标" },
  { name: "Edit", category: "基础图标" },
  { name: "Message", category: "基础图标" },
  { name: "MessageBox", category: "基础图标" },
  { name: "TurnOff", category: "基础图标" },
  { name: "Finished", category: "基础图标" },
  { name: "Delete", category: "基础图标" },
  { name: "Crop", category: "基础图标" },
  { name: "SwitchButton", category: "基础图标" },
  { name: "Operation", category: "基础图标" },
  { name: "Open", category: "基础图标" },
  { name: "Remove", category: "基础图标" },
  { name: "ZoomOut", category: "基础图标" },
  { name: "ZoomIn", category: "基础图标" },
  { name: "InfoFilled", category: "基础图标" },
  { name: "CircleCheckFilled", category: "基础图标" },
  { name: "SuccessFilled", category: "基础图标" },
  { name: "WarningFilled", category: "基础图标" },
  { name: "CircleCloseFilled", category: "基础图标" },
  { name: "QuestionFilled", category: "基础图标" },
  { name: "WarnTriangleFilled", category: "基础图标" },
  { name: "UserFilled", category: "基础图标" },
  { name: "MoreFilled", category: "基础图标" },
  { name: "Tools", category: "基础图标" },
  { name: "HomeFilled", category: "基础图标" },
  { name: "Menu", category: "基础图标" },
  { name: "UploadFilled", category: "基础图标" },
  { name: "Avatar", category: "基础图标" },
  { name: "HelpFilled", category: "基础图标" },
  { name: "Share", category: "基础图标" },
  { name: "StarFilled", category: "基础图标" },
  { name: "Comment", category: "基础图标" },
  { name: "Histogram", category: "基础图标" },
  { name: "Grid", category: "基础图标" },
  { name: "Promotion", category: "基础图标" },
  { name: "DeleteFilled", category: "基础图标" },
  { name: "RemoveFilled", category: "基础图标" },
  { name: "CirclePlusFilled", category: "基础图标" },
  { name: "ArrowLeft", category: "箭头图标" },
  { name: "ArrowUp", category: "箭头图标" },
  { name: "ArrowRight", category: "箭头图标" },
  { name: "ArrowDown", category: "箭头图标" },
  { name: "ArrowLeftBold", category: "箭头图标" },
  { name: "ArrowUpBold", category: "箭头图标" },
  { name: "ArrowRightBold", category: "箭头图标" },
  { name: "ArrowDownBold", category: "箭头图标" },
  { name: "DArrowRight", category: "箭头图标" },
  { name: "DArrowLeft", category: "箭头图标" },
  { name: "Download", category: "箭头图标" },
  { name: "Upload", category: "箭头图标" },
  { name: "Top", category: "箭头图标" },
  { name: "Bottom", category: "箭头图标" },
  { name: "Back", category: "箭头图标" },
  { name: "Right", category: "箭头图标" },
  { name: "TopRight", category: "箭头图标" },
  { name: "TopLeft", category: "箭头图标" },
  { name: "BottomRight", category: "箭头图标" },
  { name: "BottomLeft", category: "箭头图标" },
  { name: "Sort", category: "箭头图标" },
  { name: "SortUp", category: "箭头图标" },
  { name: "SortDown", category: "箭头图标" },
  { name: "Rank", category: "箭头图标" },
  { name: "CaretLeft", category: "箭头图标" },
  { name: "CaretTop", category: "箭头图标" },
  { name: "CaretRight", category: "箭头图标" },
  { name: "CaretBottom", category: "箭头图标" },
  { name: "DCaret", category: "箭头图标" },
  { name: "Expand", category: "箭头图标" },
  { name: "Fold", category: "箭头图标" },
  { name: "Document", category: "文件图标" },
  { name: "DocumentAdd", category: "文件图标" },
  { name: "Notebook", category: "文件图标" },
  { name: "Tickets", category: "文件图标" },
  { name: "Memo", category: "文件图标" },
  { name: "Collection", category: "文件图标" },
  { name: "Postcard", category: "文件图标" },
  { name: "ScaleToOriginal", category: "文件图标" },
  { name: "SetUp", category: "文件图标" },
  { name: "DocumentDelete", category: "文件图标" },
  { name: "DocumentChecked", category: "文件图标" },
  { name: "DataBoard", category: "文件图标" },
  { name: "DataAnalysis", category: "文件图标" },
  { name: "CopyDocument", category: "文件图标" },
  { name: "FolderChecked", category: "文件图标" },
  { name: "Files", category: "文件图标" },
  { name: "Folder", category: "文件图标" },
  { name: "FolderDelete", category: "文件图标" },
  { name: "FolderRemove", category: "文件图标" },
  { name: "FolderOpened", category: "文件图标" },
  { name: "DocumentCopy", category: "文件图标" },
  { name: "DocumentRemove", category: "文件图标" },
  { name: "FolderAdd", category: "文件图标" },
  { name: "FirstAidKit", category: "文件图标" },
  { name: "Reading", category: "文件图标" },
  { name: "DataLine", category: "文件图标" },
  { name: "Management", category: "文件图标" },
  { name: "Checked", category: "文件图标" },
  { name: "Ticket", category: "文件图标" },
  { name: "Failed", category: "文件图标" },
  { name: "TrendCharts", category: "文件图标" },
  { name: "List", category: "文件图标" },
  { name: "Microphone", category: "媒体图标" },
  { name: "Mute", category: "媒体图标" },
  { name: "Mic", category: "媒体图标" },
  { name: "VideoPause", category: "媒体图标" },
  { name: "VideoCamera", category: "媒体图标" },
  { name: "VideoPlay", category: "媒体图标" },
  { name: "Headset", category: "媒体图标" },
  { name: "Monitor", category: "媒体图标" },
  { name: "Film", category: "媒体图标" },
  { name: "Camera", category: "媒体图标" },
  { name: "Picture", category: "媒体图标" },
  { name: "PictureRounded", category: "媒体图标" },
  { name: "Iphone", category: "媒体图标" },
  { name: "Cellphone", category: "媒体图标" },
  { name: "VideoCameraFilled", category: "媒体图标" },
  { name: "PictureFilled", category: "媒体图标" },
  { name: "Platform", category: "媒体图标" },
  { name: "CameraFilled", category: "媒体图标" },
  { name: "BellFilled", category: "媒体图标" },
  { name: "Location", category: "位置图标" },
  { name: "LocationInformation", category: "位置图标" },
  { name: "DeleteLocation", category: "位置图标" },
  { name: "Coordinate", category: "位置图标" },
  { name: "Bicycle", category: "位置图标" },
  { name: "OfficeBuilding", category: "位置图标" },
  { name: "School", category: "位置图标" },
  { name: "Guide", category: "位置图标" },
  { name: "AddLocation", category: "位置图标" },
  { name: "MapLocation", category: "位置图标" },
  { name: "Place", category: "位置图标" },
  { name: "LocationFilled", category: "位置图标" },
  { name: "Van", category: "位置图标" },
  { name: "Watermelon", category: "美食图标" },
  { name: "Pear", category: "美食图标" },
  { name: "NoSmoking", category: "美食图标" },
  { name: "Smoking", category: "美食图标" },
  { name: "Mug", category: "美食图标" },
  { name: "GobletSquareFull", category: "美食图标" },
  { name: "GobletFull", category: "美食图标" },
  { name: "KnifeFork", category: "美食图标" },
  { name: "Sugar", category: "美食图标" },
  { name: "Bowl", category: "美食图标" },
  { name: "MilkTea", category: "美食图标" },
  { name: "Lollipop", category: "美食图标" },
  { name: "Coffee", category: "美食图标" },
  { name: "Chicken", category: "美食图标" },
  { name: "Dish", category: "美食图标" },
  { name: "IceTea", category: "美食图标" },
  { name: "ColdDrink", category: "美食图标" },
  { name: "CoffeeCup", category: "美食图标" },
  { name: "DishDot", category: "美食图标" },
  { name: "IceDrink", category: "美食图标" },
  { name: "IceCream", category: "美食图标" },
  { name: "Dessert", category: "美食图标" },
  { name: "IceCreamSquare", category: "美食图标" },
  { name: "ForkSpoon", category: "美食图标" },
  { name: "IceCreamRound", category: "美食图标" },
  { name: "Food", category: "美食图标" },
  { name: "HotWater", category: "美食图标" },
  { name: "Grape", category: "美食图标" },
  { name: "Fries", category: "美食图标" },
  { name: "Apple", category: "美食图标" },
  { name: "Burger", category: "美食图标" },
  { name: "Goblet", category: "美食图标" },
  { name: "GobletSquare", category: "美食图标" },
  { name: "Orange", category: "美食图标" },
  { name: "Cherry", category: "美食图标" },
  { name: "Items", category: "工具图标" },
  { name: "Printer", category: "工具图标" },
  { name: "Calendar", category: "工具图标" },
  { name: "CreditCard", category: "工具图标" },
  { name: "Box", category: "工具图标" },
  { name: "Money", category: "工具图标" },
  { name: "Refrigerator", category: "工具图标" },
  { name: "Cpu", category: "工具图标" },
  { name: "Football", category: "工具图标" },
  { name: "Brush", category: "工具图标" },
  { name: "Suitcase", category: "工具图标" },
  { name: "SuitcaseLine", category: "工具图标" },
  { name: "Umbrella", category: "工具图标" },
  { name: "AlarmClock", category: "工具图标" },
  { name: "Medal", category: "工具图标" },
  { name: "GoldMedal", category: "工具图标" },
  { name: "Present", category: "工具图标" },
  { name: "Mouse", category: "工具图标" },
  { name: "Watch", category: "工具图标" },
  { name: "QuartzWatch", category: "工具图标" },
  { name: "Magnet", category: "工具图标" },
  { name: "Help", category: "工具图标" },
  { name: "Soccer", category: "工具图标" },
  { name: "ToiletPaper", category: "工具图标" },
  { name: "ReadingLamp", category: "工具图标" },
  { name: "Paperclip", category: "工具图标" },
  { name: "MagicStick", category: "工具图标" },
  { name: "Basketball", category: "工具图标" },
  { name: "Baseball", category: "工具图标" },
  { name: "Coin", category: "工具图标" },
  { name: "Goods", category: "工具图标" },
  { name: "Sell", category: "工具图标" },
  { name: "SoldOut", category: "工具图标" },
  { name: "Key", category: "工具图标" },
  { name: "ShoppingCart", category: "工具图标" },
  { name: "ShoppingCartFull", category: "工具图标" },
  { name: "ShoppingTrolley", category: "工具图标" },
  { name: "Phone", category: "工具图标" },
  { name: "Scissor", category: "工具图标" },
  { name: "Handbag", category: "工具图标" },
  { name: "ShoppingBag", category: "工具图标" },
  { name: "Trophy", category: "工具图标" },
  { name: "TrophyBase", category: "工具图标" },
  { name: "Stopwatch", category: "工具图标" },
  { name: "Timer", category: "工具图标" },
  { name: "CollectionTag", category: "工具图标" },
  { name: "TakeawayBox", category: "工具图标" },
  { name: "PriceTag", category: "工具图标" },
  { name: "Wallet", category: "工具图标" },
  { name: "Opportunity", category: "工具图标" },
  { name: "PhoneFilled", category: "工具图标" },
  { name: "WalletFilled", category: "工具图标" },
  { name: "GoodsFilled", category: "工具图标" },
  { name: "Flag", category: "工具图标" },
  { name: "BrushFilled", category: "工具图标" },
  { name: "Briefcase", category: "工具图标" },
  { name: "Stamp", category: "工具图标" },
  { name: "Sunrise", category: "天气图标" },
  { name: "Sunny", category: "天气图标" },
  { name: "Ship", category: "天气图标" },
  { name: "MostlyCloudy", category: "天气图标" },
  { name: "PartlyCloudy", category: "天气图标" },
  { name: "Sunset", category: "天气图标" },
  { name: "Drizzling", category: "天气图标" },
  { name: "Pouring", category: "天气图标" },
  { name: "Cloudy", category: "天气图标" },
  { name: "Moon", category: "天气图标" },
  { name: "MoonNight", category: "天气图标" },
  { name: "Lightning", category: "天气图标" },
  { name: "ChromeFilled", category: "其他图标" },
  { name: "Eleme", category: "其他图标" },
  { name: "ElemeFilled", category: "其他图标" },
  { name: "ElementPlus", category: "其他图标" },
  { name: "Shop", category: "其他图标" },
  { name: "SwitchFilled", category: "其他图标" },
  { name: "WindPower", category: "其他图标" }
])

// 图标名称表格列
const iconNamesColumns = ref([
  { label: "图标名称", prop: "name", width: "200" },
  { label: "分类", prop: "category" }
])
</script>

<style scoped>
.pageWrap {
  padding: 20px;
}

/* 页面头部样式 */
.page-header {
  padding: 30px 0;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 30px;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  color: #303133;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
}

.page-description {
  color: #606266;
  font-size: 16px;
  margin: 0;
}

/* 示例组样式 */
.input-group {
  width: 100%;
  margin-bottom: 0;
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.input-group:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
  border-color: #e6f7ff;
}

.input-group h4 {
  margin-bottom: 20px;
  font-size: 16px;
  color: #303133;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 2px solid #e6f7ff;
  position: relative;
  text-align: left;
}

.input-group h4::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 40px;
  height: 2px;
  background-color: #1890ff;
  border-radius: 2px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  justify-items: center;
  align-items: center;
}

.icon-category {
  margin-bottom: 24px;
}

.icon-category h4 {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.component-docs {
  margin-top: 48px;
}

.component-docs h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 24px 0;
}

.doc-section {
  margin-bottom: 36px;
}

.doc-section h4 {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 16px 0;
}

.custom-icon {
  font-size: 32px;
}
</style>
