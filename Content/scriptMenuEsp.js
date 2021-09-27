var MainDisplay = document.getElementById('MainDisplay');
let MainDisplayTermostat = document.getElementById('MainDisplayTermostat');
let MainDisplayConditioner = document.getElementById('MainDisplayConditioner');
let TermostatBlock = document.getElementById('TermostatBlock');
let DispairHomekitBtn = document.getElementById('DispairHomekitBtn');
let SettingIcon = document.querySelectorAll('.SettingIcon');
let BackToMainDevicePage = document.getElementById('BackToMainDevicePage');
let DeviceSettings = document.getElementById('DeviceSettings');
let ResetSettings = document.getElementById('ResetSettings');
let DropHomekit = document.getElementById('DropHomekit');
let BlocksInfo = document.querySelectorAll('.BlockInfo');
let UpdateLytkoBtn = document.getElementById('UpdateLytkoBtn');
let DropUpWindowClose = document.querySelectorAll('.DropUpWindowClose');
let GetMQTTData = document.getElementById('GetMQTTData');
let BackToSettings = document.querySelectorAll('.BackToSettings');
let SettingItems = document.querySelectorAll('.SettingItem');
let SettingPage = document.querySelectorAll('.Tab');
let BackToMainDisplay = document.querySelectorAll('.BackToMainDisplay');
let MQTTReceivedInfo = document.getElementById('MQTTReceivedInfo');
let ConnectMQTTBtn = document.getElementById('ConnectMQTTBtn');
let DisconnectMQTTBtn = document.getElementById('DisconnectMQTTBtn');
let ZigBeeSensors = document.getElementById('ZigBeeSensors');
let DisconnectBtnZigBee = document.getElementById('DisconnectBtnZigBee');
let MqttInputData = document.getElementById('MqttInputData');
let ConnectInnerSensorBtn = document.getElementById('ConnectInnerSensorBtn');
let AddedTopic = document.getElementById('AddedTopic');
let DisconnectInnerSensorBtn = document.getElementById('DisconnectInnerSensorBtn');
let ChooseUpdateFileBtn = document.getElementById('ChooseUpdateFileBtn');
let LytkoUpdateBar = document.getElementsByClassName('LytkoUpdateBar')[0];
let LytkoUpdateInformation = document.getElementsByClassName('LytkoUpdateInformation')[0];
let InDevelop = document.getElementById('InDevelop');
let ChangeTempPositionBtn = document.getElementById('ChangeTempPositionBtn');
let InDevelopFunction = document.querySelectorAll('.InDevelopFunction');
let MainMenuWidgetComeHomeBlock = document.getElementsByClassName('MainMenuWidgetComeHomeBlock')[0];
let DropSettings = document.getElementById('DropSettings');
let HeatingTermostat = document.getElementById('HeatingTermostat');
let AccountSettings = document.getElementById('AccountSettings');
let BackToAccountSetting = document.getElementsByClassName('BackToAccountSetting')[0];
let AccountIcon = document.getElementById('AccountIcon');
let AlicePage = document.getElementById('AlicePage');
let AliceLink = document.getElementById('AliceLink');
let RestorePass = document.getElementById('RestorePass');
let Registration = document.getElementById('Registration');
let AliceLogIn = document.getElementById('AliceLogIn');
let AliceLogOut = document.getElementById('AliceLogOut');
let AliceInfoPopUp = document.getElementById('AliceInfoPopUp');
let DropUpAliceInfo = document.getElementById('DropUpAliceInfo');
let CloseAliceInfo = document.getElementById('CloseAliceInfo');
let MainMenuWidgetArrowUp = document.querySelectorAll('.MainMenuWidgetArrowUp');
let MainMenuWidgetArrowDown = document.querySelectorAll('.MainMenuWidgetArrowDown');
//Conditioner Handlers
let AutoTempHandler = document.querySelectorAll('.AutoTempHandler');
let HeatingTempHandler = document.getElementById('HeatingTempHandler');
let CoolTempHandler = document.getElementById('CoolTempHandler');
let FanHandler = document.getElementById('FanHandler');
let FanSpeedValue = document.getElementById('FanSpeedValue');

var wifiBlocksFirstSetting = document.getElementsByClassName('WifiBlock');
let AliceShowPass = document.getElementById('AliceShowPass');
var ShowPassElem = document.getElementById('ShowPass');
var ShowPassTrigger = true;
var WifiSelected;
var WifiPassword;
var WifiConnectBtn = document.getElementById('WifiConnectBtn');
var WifiRefreshBtn = document.getElementById('RefreshWifiList');
let OneStageSettingDissapearElem = document.getElementById('OneStageSetting');
let TwoStageSettingDissapearElem = document.getElementById('TwoStageSetting');
let BackToOneStageSetting = document.getElementById('BackToOneStageSetting');
let ThreeStageSettingDissapearElem = document.getElementById('ThreeStageSetting');
let FourStageSettingDissapearElem = document.getElementById('FourStageSetting');
let GisteresisStageSetting = document.getElementById('GisteresisStageSetting');
let TempStageSetting = document.getElementById('TempStageSetting');
var TypeResistanceBlocks = document.getElementsByClassName('TypeResistanceBlock');
var ResistanceBtnNext = document.getElementById('ResistanceBtnNext');
var BackToWifiStage = document.getElementById('BackToWifiStage');
var ToResistanceTypeBtnBack = document.getElementById('ToResistanceTypeBtnBack');
var BackToFourStageFromGisteresis = document.getElementById('BackToFourStageFromGisteresis');
var BackToFourStageFromTemp = document.getElementById('BackToFourStageFromTemp');
var CompleteSettingBtn = document.getElementById('CompleteSettingBtn');
let ProgressUpdate = document.getElementById('ProgressUpdate');
let MaxTablo;
let MinTablo;
let GisteresisTablo;
let CorrectionTablo;
let CurrentUpdateSocket = null;
let HeatingTrigger = false;
let CurrentSocket = null;
let FirstConfigurate = false;
let TypeFirstConfigurate = '';
var WifiIconArray = [
    '<svg width="22" height="16" viewBox="0 0 22 16" fill="none"><path d = "M0 5.00001L2 7.00001C6.97 2.03001 15.03 2.03001 20 7.00001L22 5.00001C15.93 -1.06999 6.08 -1.06999 0 5.00001ZM8 13L11 16L14 13C12.35 11.34 9.66 11.34 8 13ZM4 9.00001L6 11C8.76 8.24001 13.24 8.24001 16 11L18 9.00001C14.14 5.14001 7.87 5.14001 4 9.00001Z" fill = "#818288"/></svg >',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d = "M1 9.00001L3 11C7.97 6.03001 16.03 6.03001 21 11L23 9.00001C16.93 2.93001 7.08 2.93001 1 9.00001ZM9 17L12 20L15 17C13.35 15.34 10.66 15.34 9 17ZM5 13L7 15C9.76 12.24 14.24 12.24 17 15L19 13C15.14 9.14001 8.87 9.14001 5 13Z" fill = "#818288" /><path d="M9 17.0001L12 20.0001L15 17.0001C13.35 15.3401 10.66 15.3401 9 17.0001Z" fill="white" /></svg >',
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M1 9.00001L3 11C7.97 6.03001 16.03 6.03001 21 11L23 9.00001C16.93 2.93001 7.08 2.93001 1 9.00001ZM9 17L12 20L15 17C13.35 15.34 10.66 15.34 9 17ZM5 13L7 15C9.76 12.24 14.24 12.24 17 15L19 13C15.14 9.14001 8.87 9.14001 5 13Z" fill="#818288" /><path d="M9 17L12 20L15 17C13.35 15.34 10.66 15.34 9 17ZM5 13L7 15C9.76 12.24 14.24 12.24 17 15L19 13C15.14 9.13998 8.87 9.13998 5 13Z" fill="white" /></svg>',
    '<svg width="22" height="16" viewBox="0 0 22 16" fill="none"><path d = "M0 5.00001L2 7.00001C6.97 2.03001 15.03 2.03001 20 7.00001L22 5.00001C15.93 -1.06999 6.08 -1.06999 0 5.00001ZM8 13L11 16L14 13C12.35 11.34 9.66 11.34 8 13ZM4 9.00001L6 11C8.76 8.24001 13.24 8.24001 16 11L18 9.00001C14.14 5.14001 7.87 5.14001 4 9.00001Z" fill = "white"/></svg >',
    '<svg width="22" height="19" viewBox="0 0 22 19" fill="none"><path d = "M21.99 8.00004C18.15 4.16004 12.8 2.76004 7.84 3.78004L10.36 6.30004C13.83 6.13004 17.35 7.35004 19.99 10L21.99 8.00004ZM17.99 12C16.7 10.71 15.15 9.87004 13.5 9.44004L17.03 12.97L17.99 12ZM1 2.05004L4.07 5.10004C2.6 5.82004 1.22 6.78004 0 8.00004L1.99 10C3.23 8.76004 4.66 7.84004 6.19 7.23004L8.43 9.47004C6.81 9.89004 5.27 10.73 4 12V12.01L5.99 14C7.35 12.64 9.13 11.96 10.91 11.94L17.98 19L19.25 17.74L2.29 0.790039L1 2.05004ZM8 16L11 19L14 16C12.35 14.34 9.66 14.34 8 16Z" fill = "#818288"/></svg >'
];
var WifiDefCollection = {
    5: 'WEP',
    2: 'WPA / PSK',
    4: 'WPA2 / PSK',
    7: 'Открытая сеть',
    8: 'WPA / WPA2 / PSK'
}
var SensorIdCollection = {
    'Digital': 0,
    '3.3_кОм': 1,
    '5_кОм': 2,
    '6.8_кОм': 3,
    '10_кОм(Lytko)': 4,
    '12_кОм': 5,
    '14.8_кОм': 6,
    '15_кОм': 7,
    '20_кОм': 8,
    '33_кОм': 9,
    '47_кОм': 10,
}
var configTermostat = {
    "config": {
        "wifi_name": "markedWifiName",
        "wifi_pass": "markedWifiPass",
        "homekit": 0,
        "hysteresis": 1,
        "max_temp": 75,
        "min_temp": 7,
        "sensor_corr": 0,
        "sensor_model_id": null,
        "sensor_internal_use": 1
    }
}
var configConditioner = {
    "config":
    {
        "wifi_name": "markedWifiName",
        "wifi_pass": "markedWifiPass",
        "air_brand": "daikin",
        "homekit": ""
    }
};
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
function SwitchElem(Disappear, Appear) {
    Disappear.style.display = 'none';
    Appear.style.display = 'flex';
}
function FirstSettingsTools() {
    let ModeOfWork = document.getElementById('ModeOfWork');
    let BackConditioner = document.getElementById('BackConditioner');
    let BackTermostat = document.getElementById('BackTermostat');
    let MqttModeWork = document.getElementById('MqttModeWork');
    MqttModeWork.querySelector('.SelectedIcon').style.display = 'flex';
    configConditioner.config.homekit =  0;
    configTermostat.config.homekit = 0;
    ModeOfWork.onclick = function () {
        let ModeWorkDevice = document.getElementById('ModeWorkDevice');
        SwitchElem(this.parentElement.parentElement, ModeWorkDevice);
    }
    let SelectingModeWork = document.querySelectorAll('.SelectingModeWork');
    SelectingModeWork.forEach(item => item.onclick = function () {
        SelectingModeWork.forEach(item => item.querySelector('.SelectedIcon').style.display = 'none');
        this.querySelector('.SelectedIcon').style.display = 'flex';
        if (this.parentElement.id === 'ConditionerModeWork') {
            configConditioner.config.homekit = this.id === 'MqttModeWork' ? 0 : 2;
        }
        else if (this.parentElement.id === 'TeromstatModeWork') {
            configTermostat.config.homekit = this.id === 'MqttModeWork' ? 0 : 2;
        }
    });
    if (CurrentSocket.type === 'esp8266_air') {
        BackConditioner.onclick = function () {
            SwitchElem(ModeWorkDevice, ThreeStageSettingDissapearElem);
        }
    }
    else if (CurrentSocket.type === 'esp8266_thermostat') {
        BackTermostat.onclick = function () {
            SwitchElem(ModeWorkDevice, FourStageSettingDissapearElem);
        }
        if (CurrentSocket.config.sensor_internal_use === '255') {
            let InnerSensorBlock = document.getElementById('InnerSensorBlock');
            InnerSensorBlock.style.display = 'none';
        }
        let ResistanceKey = getKeyByValue(SensorIdCollection, 4);
        let ResistanceItem = SearchByHtmlCollectionByIdOrNull(TypeResistanceBlocks, ResistanceKey);
        if (ResistanceItem != null) {
            SelectResistance(ResistanceItem);
        }
    }   
    if (CurrentSocket.type === 'esp8266_thermostat') {
        TabloTempInitialization();
        ResistanceBtnNext.onclick = function () {
            if (configTermostat.config.sensor_model_id != null)
                SwitchElem(ThreeStageSettingDissapearElem, FourStageSettingDissapearElem);
        }
        ToResistanceTypeBtnBack.onclick = function () { SwitchElem(FourStageSettingDissapearElem, ThreeStageSettingDissapearElem); }
        BackToFourStageFromGisteresis.onclick = function () { SwitchElem(GisteresisStageSetting, FourStageSettingDissapearElem); }
        BackToFourStageFromTemp.onclick = function () { SwitchElem(TempStageSetting, FourStageSettingDissapearElem); }
        FirstGisteresisSetting.onclick = function () { SwitchElem(FourStageSettingDissapearElem, GisteresisStageSetting); }
        FirstTempSetting.onclick = function () { SwitchElem(FourStageSettingDissapearElem, TempStageSetting); }
    }
    BackToOneStageSetting.onclick = function () {
        SwitchElem(TwoStageSettingDissapearElem, OneStageSettingDissapearElem);
    }
    BackToWifiStage.onclick = function () {
        if (WifiSelected.querySelectorAll('.GuardTypeWifi')[0].innerHTML === 'Открытая сеть') {
            SwitchElem(ThreeStageSettingDissapearElem, OneStageSettingDissapearElem);
        }
        else {
            SwitchElem(ThreeStageSettingDissapearElem, TwoStageSettingDissapearElem);
        }
    }
    CompleteSettingBtn.onclick = function () {
        if (CurrentSocket.type === 'esp8266_thermostat')
            CurrentSocket.Socket.send(JSON.stringify(configTermostat));
        else
            CurrentSocket.Socket.send(JSON.stringify(configConditioner));
    }
    CompleteSettingBtnTwo.onclick = function () {
        if (CurrentSocket.type === 'esp8266_thermostat')
            CurrentSocket.Socket.send(JSON.stringify(configTermostat));
        else
            CurrentSocket.Socket.send(JSON.stringify(configConditioner));
    }
}

ShowPass.onclick = function () {
    let ShowIcon = document.getElementById('ShowIcon');
    let NotShowIcon = document.getElementById('NotShowIcon');
    if (ShowPassTrigger) {
        let PassInput = document.getElementById('PasswordFirstSetting');
        PassInput.type = 'text';
        ShowPassTrigger = !ShowPassTrigger;
        NotShowIcon.style.display = 'none';
        ShowIcon.style.display = 'block';
    } else {
        let PassInput = document.getElementById('PasswordFirstSetting');
        PassInput.type = 'password';
        ShowPassTrigger = !ShowPassTrigger;
        NotShowIcon.style.display = 'block';
        ShowIcon.style.display = 'none';
    }
}
function SelectResistance(Item) {
    let checkedSelectedIcon = Item.children[1].style.display;
    if (Item.id != 'InnerSensorBlock') {
        if (checkedSelectedIcon === 'none' || checkedSelectedIcon === '') {
            document.querySelectorAll('.SelectedIcon').forEach(item => item.id != 'InnerSensorIcon' ? item.style.display = 'none' : false);
            Item.children[1].style.display = 'block';
            configTermostat.config.sensor_model_id = SensorIdCollection[Item.id];
            if (!FirstConfigurate) {
                CurrentSocket.Socket.send(JSON.stringify({
                    "sensor_model_id": SensorIdCollection[Item.id]
                }));
                SetLoader(10, function () { location.host = location.host; });
            }
        }
        //else {
        //    Item.children[1].style.display = 'none';
        //    configTermostat.config.sensor_model_id = null;
        //}
    }
    else {
        if (checkedSelectedIcon === 'none' || checkedSelectedIcon === '') {
            Item.children[1].style.display = 'block';
            configTermostat.config.sensor_internal_use = 1;
            if (!FirstConfigurate)
                CurrentSocket.Socket.send(JSON.stringify({
                    "sensor_internal_use": 1
                }));
        }
        else {
            Item.children[1].style.display = 'none';
            configTermostat.config.sensor_internal_use = 0;
            if (!FirstConfigurate)
                CurrentSocket.Socket.send(JSON.stringify({
                    "sensor_internal_use": 0
                }));
        }
    }
}
for (i = 0; TypeResistanceBlocks.length > i; i++) {
    TypeResistanceBlocks[i].children[1].style.display = 'none';
    TypeResistanceBlocks[i].onclick = function () {
        SelectResistance(this);
    }
}
function InsertSensors() {
    if (CurrentSocket.config.sensor_model_id != '') {
        document.querySelectorAll('.TypeResistanceBlock').forEach(item => item.children[1].style.display = 'none');
        let SensorType = getKeyByValue(SensorIdCollection, Number(CurrentSocket.config.sensor_model_id));
        SearchByHtmlCollectionByIdOrNull(TypeResistanceBlocks, SensorType).querySelector('.SelectedIcon').style.display = 'block';
    }
    if (CurrentSocket.config.sensor_internal_use === '1') {
        SearchByHtmlCollectionByIdOrNull(TypeResistanceBlocks, 'InnerSensorBlock').querySelector('.SelectedIcon').style.display = 'block';
    }
    if (CurrentSocket.config.sensor_internal_use === '255') {
        let InnerSensorBlock = document.getElementById('InnerSensorBlock');
        InnerSensorBlock.style.display = 'none';
    }
}
let SelectedConditioner = document.querySelectorAll('.SelectedConditioner');
SelectedConditioner.forEach(item => item != null ? item.onclick = function () { SelectConditionerBlock(this) } : false);
function SelectConditionerBlock(Item) {
    let checkedSelectedIcon = Item.children[1].style.display;
    if (checkedSelectedIcon === 'none' || checkedSelectedIcon === '') {
        document.getElementsByClassName('ConditionerPage')[0].querySelectorAll('.SelectedIcon').forEach(item => item.style.display = 'none');
        Item.children[1].style.display = 'block';
        configConditioner.config.air_brand = Item.id;
        if (!FirstConfigurate) {
            CurrentSocket.Socket.send(JSON.stringify({
                "config": {
                    air_brand: configConditioner.config.air_brand
                }
            }));
        }
    }
    else {
        Item.children[1].style.display = 'none';
        configConditioner.config.air_brand = null;
    }
}
function InsertConditionerBrand() {
    if (CurrentSocket.config.air_brand != undefined) {
        let GetBrand = document.getElementById(CurrentSocket.config.air_brand);
        SelectConditionerBlock(GetBrand);
    }
    
}
let AllArrow = document.querySelectorAll('.ArrowTemp');
AllArrow.forEach(item => item.onclick = ChangeTempDynamic);
let TypeChangingTempArray = {
    'TabloTempMin' : 'Standart',
    'TabloTempMax': 'Standart',
    'TabloTempGisteresis': 'Gisteresis',
    'TabloTempCorrection': 'Correction'
};
let GisteresisInvertArray = { 1: '1.00', 2: '2.00', 3: '3.00', 4: '4.00', 5: '5.00' };
let CorrectionInvertArray = {
    '-5': '-5.00', '-4.5': '-4.50', '-4': '-4.00', '-3.5': '-3.50', '-3': '-3.00', '-2.5': '-2.50', '-2': '-2.00', '-1.5': '-1.50', '-1': '-1.00', '-0.5': '-0.50', '0': '0',
    '5': '5.00', '4.5': '4.50', '4': '4.00', '3.5': '3.50', '3': '3.00', '2.5': '2.50', '2': '2.00', '1.5': '1.50', '1': '1.00', '0.5': '0.50'
};
function ChangeTempDynamic() {
    let Tablo = this.parentElement.querySelector('.ChangingTempTablo');
    let MaxTabloTemp = Number(MaxTablo.innerHTML);
    let MinTabloTemp = Number(MinTablo.innerHTML);
    let TypeChangingTemp = this.parentElement.id;
    let DirectionChangeTemp = this.classList.contains('TempUp');
    let Sum;
    let RangeStart;
    let RangeEnd;
    if (TypeChangingTempArray[TypeChangingTemp] === 'Standart') {
        RangeStart = 7;
        RangeEnd = 75;
    } else if (TypeChangingTempArray[TypeChangingTemp] === 'Gisteresis') {
        RangeStart = 1;
        RangeEnd = 5;
    } else if (TypeChangingTempArray[TypeChangingTemp] === 'Correction') {
        RangeStart = -5;
        RangeEnd = 5;
    }
    let StepCountingTemp = 1;
    if (TypeChangingTemp === 'TabloTempCorrection')
        StepCountingTemp = 0.5;
    let CurrentTemp = Number(Tablo.innerText);
    let DifferenceTemp = MaxTabloTemp - MinTabloTemp;
    if (TypeChangingTempArray[TypeChangingTemp] === 'Standart') {
        if (DirectionChangeTemp & CurrentTemp < RangeEnd) {
            if (CurrentTemp === MinTabloTemp & DifferenceTemp === 1) {
                Tablo.innerHTML = CurrentTemp;
            } else {
                Sum = CurrentTemp + StepCountingTemp;
                Tablo.innerHTML = Sum;
                if (!FirstConfigurate) {
                    if (TypeChangingTemp === 'TabloTempMin')
                        CurrentSocket.Socket.send(JSON.stringify({
                            "min_temp": Sum
                        }));
                    else
                        CurrentSocket.Socket.send(JSON.stringify({
                            "max_temp": Sum
                        }));
                }

            }
        }
        else if (!DirectionChangeTemp & CurrentTemp > RangeStart) {
            if (CurrentTemp === MaxTabloTemp & DifferenceTemp === 1) {
                Tablo.innerHTML = CurrentTemp;
            } else {
                Sum = CurrentTemp - StepCountingTemp;
                Tablo.innerHTML = Sum;
                if (!FirstConfigurate) {
                    if (TypeChangingTemp === 'TabloTempMin')
                        CurrentSocket.Socket.send(JSON.stringify({
                            "min_temp": Sum
                        }));
                    else
                        CurrentSocket.Socket.send(JSON.stringify({
                            "max_temp": Sum
                        }));
                }
            }
        }
        else
            Tablo.innerHTML = CurrentTemp;
        if (TypeChangingTemp === 'TabloTempMin')
            configTermostat.config.min_temp = Sum;
        if (TypeChangingTemp === 'TabloTempMax')
            configTermostat.config.max_temp = Sum;
    } else {
        if (DirectionChangeTemp & CurrentTemp < RangeEnd) {
                Sum = CurrentTemp + StepCountingTemp;
                Tablo.innerHTML = Sum;
        }
        else if (!DirectionChangeTemp & CurrentTemp > RangeStart) {
                Sum = CurrentTemp - StepCountingTemp;
                Tablo.innerHTML = Sum;
        }
        else
            Tablo.innerHTML = CurrentTemp;
        if (TypeChangingTemp === 'TabloTempGisteresis' & GisteresisInvertArray[Sum] != undefined) {
            configTermostat.config.hysteresis = GisteresisInvertArray[Sum];
            if (!FirstConfigurate)
                CurrentSocket.Socket.send(JSON.stringify({
                    "hysteresis": GisteresisInvertArray[Sum]
                }));
        }

        if (TypeChangingTemp === 'TabloTempCorrection' & CorrectionInvertArray[Sum] != undefined) {
            if (!FirstConfigurate)
                CurrentSocket.Socket.send(JSON.stringify({
                    "sensor_correction": CorrectionInvertArray[Sum]
                }));
            configTermostat.config.sensor_corr = Sum;
        }

    }
}
window.onload = function () {
    ArraySocket.forEach(item => item != null ? WebSocketOpen(item) : false);
}
var ArraySocket = new Array();
var ArraySocketItem = {
    Socket : null,
    id : null,
    type : null
}
ArraySocket.push(ArraySocketItem = {
    Socket: new WebSocket("ws://" + location.host + "/ws"),
    //id: "15299390",
    //type: "esp8266_thermostat",
    //type: "esp8266_air",
    config: null,
    update: null,
    mqtt_topics: null,
    wifi_networks: null,
    qr_hk: null,
    ssdp: null
});
let DeviceConfigArray = new Array();
function WebSocketOpen(SocketItemDevice) {
    SocketItemDevice.Socket.onopen = function (evt) {
    };
    SocketItemDevice.Socket.onerror = function (error) {
        console.log("Error " + error.message)
    };
    SocketItemDevice.Socket.close = function (event) {
        if (event.wasClean) {
            wsOpen();
        } else {
            console.log('Connection failed'); // например, "убит" процесс сервера
        }
        console.log('Code: ' + event.code + ' reason: ' + event.reason);
    };
    SocketItemDevice.Socket.onmessage = function (event) {
        var MessageJson = JSON.parse(event.data);
        if ('ssdp' in MessageJson) {
            if (ArraySocket[0].Socket === this) {
                for (let i = 0; MessageJson.ssdp.length > i; i++) {
                    if (ArraySocket[i] && ArraySocket[i].Socket === this) {
                        ArraySocket[i].ssdp = MessageJson.ssdp;
                        ArraySocket[i].type = MessageJson.ssdp[i].type;
                        ArraySocket[i].id = MessageJson.ssdp[i].id;
                    } else if (ArraySocket.find(item => item.id === MessageJson.ssdp[i].id) === undefined) {
                        ArraySocket.push(ArraySocketItem = {
                            Socket: new WebSocket("ws://" + MessageJson.ssdp[i].ip + "/ws"),
                            id: MessageJson.ssdp[i].id,
                            type: MessageJson.ssdp[i].type,
                            ssdp: MessageJson.ssdp
                        });
                        WebSocketOpen(ArraySocket[i]);
                    }
                }
            }
        }
        if (MessageJson.wifi_networks != null) {
            ArraySocket[0].wifi_networks = MessageJson.wifi_networks;
            ShowWifiList(ArraySocket[0].wifi_networks);
        }
        if ('config' in MessageJson) {
            for (let i = 0; ArraySocket.length > i; i++) {
                if (ArraySocket[i].id === SocketItemDevice.id) {
                    ArraySocket[i].config = MessageJson.config;
                    if (ArraySocket[0].config != null && ArraySocket[0].config.set === '0') {
                        CurrentSocket = ArraySocket[0];
                        FirstConfigurate = true;
                        FirstSettingsTools();
                    }
                    else {
                        let DeviceBlockCheck = document.getElementById(ArraySocket[i].id);
                        if (!DeviceBlockCheck)
                            CreateDeviceBlock(SocketItemDevice, ArraySocket[i].type);
                        NavigationMainMenu();
                        if (CurrentSocket) {
                            ChangeTargetTemp();
                            InsertMqtt();
                        }
                    }
                }
            }
        }
        if ('update' in MessageJson) {
            for (let i = 0; ArraySocket.length > i; i++) {
                if (!FirstConfigurate) {
                  if (ArraySocket[i].id === SocketItemDevice.id) {
                     ArraySocket[i].update = MessageJson.update;
                     SetMainDisplay(ArraySocket[i]);
                      if (ArraySocket[i].type === 'esp8266_thermostat') {
                          let MaindisplayHeating = document.getElementById(ArraySocket[i].id).querySelector('.HeatingTermostatByID').style.background = ArraySocket[i].update.heating === 'off' ? '#1F3C62' : '#035CD0';
                      }
                      else {
                          if (CurrentSocket != null && CurrentSocket.type === 'esp8266_air') {
                              UpdateConditioner(CurrentSocket);
                          }
                      }
                      if (CurrentSocket != null) {
                          ChangeTargetTemp();
                          if (CurrentSocket.type === 'esp8266_thermostat') {
                              HeatingRegulate();
                          }
                      }
                  }
                }
            }
        }
        if (MessageJson.update_status != 0) {
            for (let i = 0; ArraySocket.length > i; i++) {
                if (ArraySocket[i].id === SocketItemDevice.id) {
                    if (MessageJson.update_status < 100) {
                        ProgressUpdate.style.width = MessageJson.update_status + '%';
                    }
                    else if (MessageJson.update_status === 100) {
                        SwitchElem(LytkoUpdateBar, LytkoUpdateInformation);
                        SetLoader(5, function () { location.host = location.host; })
                    }
                }
            }

        }
        if ('mqtt_topics' in MessageJson) {
            for (let i = 0; ArraySocket.length > i; i++) {
                if (ArraySocket[i].id === SocketItemDevice.id) {
                    ArraySocket[i].mqtt_topics = MessageJson.mqtt_topics;
                }
            }

        }
        if ('qr_hk' in MessageJson) {
            for (let i = 0; ArraySocket.length > i; i++) {
                if (ArraySocket[i].id === SocketItemDevice.id) {
                    ArraySocket[i].qr_hk = MessageJson.qr_hk;
                }
            }

        }
        if ('refresh' in MessageJson) {
            location.host = location.host;
        }
        if ('loading' in MessageJson) {
            if (MessageJson.loading)
                SetLoader(999,null);
            else
                SetLoader(1, null);
        }
    }
}
function SetMainDisplay(Socket) {
    let MainDisplayBlock = document.getElementById(Socket.id);
    let MainDisplayValue = MainDisplayBlock.querySelectorAll('.DeviceBlockValue')[0];
    MainDisplayValue.innerHTML = Socket.update.temp + '°C';
    let AutoHandlerConditioner = MainDisplayBlock.querySelector('.AutoConditionerMainDisplay');
    let FanHandlerMainDisplay = MainDisplayBlock.querySelector('.FanHandlerMainDisplay');
    if (AutoHandlerConditioner != null) {
        AutoHandlerConditioner.style.background = Socket.update.heating === 'auto' ? '#035CD0' : '#1F3C62';
    }
    if (FanHandlerMainDisplay != null)
        FanHandlerMainDisplay.innerHTML = FanIconsArray[Socket.update.fan_speed];
}
function SearchByHtmlCollectionByIdOrNull(Collection, Id) {
    for (indexCollection = 0; Collection.length > indexCollection; indexCollection++) {
        if (Collection[indexCollection].id === Id)
            return Collection[indexCollection];
    }
    return null;
}
function ShowMainMenuBySocket(Socket) {
    ChangeTargetTemp()
    TabloTempInitialization();
    HeatingRegulate();
    InsertTemp();
    ShowWifiList(ArraySocket[0].wifi_networks);
    ShowWifiConnectMarker()
    PairHk();
    UpdateSet();
    ZigBeeSet();
    NavigationDevice();
    ConnectInnerSensor();
    InsertExternalInnerSensor();
    MainMenuWidgetBtn();
    SetUpdateInformation();
    InsertMqtt();
    if (Socket.type === 'esp8266_air') {
        UpdateConditioner(Socket);
        ConditionerHandlers();
        InsertConditionerBrand();
    }
    if (Socket.type === 'esp8266_thermostat') {
        InsertSensors();
    }
    DropSettings.onclick = function () {
        CurrentSocket.Socket.send(JSON.stringify("reset"));
        SetLoader(5, function () { location.host = location.host; })
    }
}
function ShowWifiConnectMarker() {
    if (!FirstConfigurate) {
        if (CurrentSocket.config.wifi_name != '') {
            document.getElementsByClassName('WifiConnect')[0].innerHTML = CurrentSocket.config.wifi_name;
            document.getElementsByClassName('WifiConnect')[0].style.display = 'flex';
        }
        else {
            document.getElementsByClassName('WifiConnect')[0].style.display = 'none';
        }
    }
}
function SetUpdateInformation() {
    let CurrentVersion = LytkoUpdateInformation.querySelector('.CurrentVersion');
    let AccessVersion = LytkoUpdateInformation.querySelector('.AccessVersion');
    CurrentVersion.innerHTML = 'Текущая версия ' + CurrentSocket.config.version;
    AccessVersion.innerHTML = 'Доступно обновление ' + CurrentSocket.config.version_new;
}
function NavigationMainMenu() {
    AccountIcon.onclick = function () { SwitchElem(MainDisplay, AccountSettings); };
    AliceLink.onclick = function () { SwitchElem(AccountSettings, AlicePage); }
    RestorePass.onclick = function () { window.location.href = "https://lytko.com/registration/reset.html"; }
    Registration.onclick = function () { window.location.href = "https://lytko.com/registration/regForm.html"; }
    BackToMainDisplay.forEach(item => item.onclick = NavMainDisplay);
    BackToAccountSetting.onclick = function () { SwitchElem(AlicePage, AccountSettings); }
    InDevelopFunction.forEach(item => item.onclick = ShowInDevelop);
    AliceSet();
}
function MainMenuWidgetBtn() {
    MainMenuWidgetArrowUp.forEach(item => item.onclick = function () {
        CurrentSocket.Socket.send(JSON.stringify("tempUp"));
    });
    MainMenuWidgetArrowDown.forEach(item => item.onclick = function () {
        CurrentSocket.Socket.send(JSON.stringify("tempDown"));
    });
}
function ConditionerHandlers() {
    AutoTempHandler.forEach(item => item.onclick = function () {
        RegulateConditionerHeating('auto', 3);
    })
    HeatingTempHandler.onclick = function () {
        RegulateConditionerHeating('heat', 1);
    }
    CoolTempHandler.onclick = function () {
        RegulateConditionerHeating('cool ', 2);
    }
    FanHandler.onchange = function () {
        let dataFan = Math.ceil(FanHandler.value / 20);
        CurrentSocket.Socket.send(JSON.stringify(
            {
                "fan_speed": dataFan
            }
        ));
    }
}
function RegulateConditionerHeating(CaseHeating, Number) {
    if (CurrentSocket != null) {
        let dataForSocket = CurrentSocket.update.heating === CaseHeating ? '0' : Number;
        CurrentSocket.Socket.send(JSON.stringify(
            {
                "heating": dataForSocket
            }
        ));
    }
}
function UpdateConditioner(Socket) {
    let FanSpeedArray = {
        0: '0',
        1: '20',
        2: '40',
        3: '60',
        4: '80',
        5: '100'
    };
    //let DeviceBlockThisConditiner = document.getElementById(Socket.id);
    //let AutoHeatingMainDisplay = DeviceBlockThisConditiner.querySelector('.AutoConditionerMainDisplay');
    //AutoHeatingMainDisplay.style.background =
    AutoTempHandler.forEach(item => Socket.update.heating === 'auto' ? item.style.background = '#035CD0' : item.style.background = '#1F3C62');
    HeatingTempHandler.style.background = Socket.update.heating === 'heat' ? HeatingTempHandler.style.background = '#035CD0' : HeatingTempHandler.style.background = '#1F3C62';
    CoolTempHandler.style.background = Socket.update.heating === 'cool' ? CoolTempHandler.style.background = '#035CD0' : CoolTempHandler.style.background = '#1F3C62';
    FanHandler.value = FanSpeedArray[Socket.update.fan_speed];
    FanSpeedValue.innerHTML = FanHandler.value + '%';
}
function UpdateSet() {
    let UpdateMarker = document.getElementsByClassName('AvailableUpdate')[0];
    if (CurrentSocket.config.name != '') {
        InputName = document.getElementById('NameInput');
        InputName.value = CurrentSocket.config.name;
    }
    if (CurrentSocket.update.newfw != '0') {
        UpdateMarker.style.display = 'flex';
        UpdateLytkoBtn.removeAttribute('disabled');
        UpdateLytkoBtn.style.background = '#035CD0';
    }
    else {
        UpdateMarker.style.display = 'none';
        UpdateLytkoBtn.setAttribute('disabled', 'disabled');
        UpdateLytkoBtn.style.background = '#1F3C62';
    }
    ChooseUpdateFileBtn.onclick = function () {
        window.location.href = "/manual_update";
    }
    UpdateLytkoBtn.onclick = function () {
        let HideBtnGroup = document.querySelectorAll('.UpdateHideBtn');
        HideBtnGroup.forEach(item => item.style.display = 'none');
        CurrentSocket.Socket.send(JSON.stringify(
            {
                files: {
                    "ino_bin": CurrentSocket.config.link
                }
            }
        ));
        SwitchElem(LytkoUpdateInformation, LytkoUpdateBar);
    }
}
function ConnectInnerSensor() {
    ConnectInnerSensorBtn.onclick = function () {
        let InnerSensorTopic = document.getElementById('InnerSensorTopic');
        let SensorAdded = document.getElementById('SensorAdded');
        let InnerSensorDataTab = document.getElementById('InnerSensorDataTab');
        let NameAddedTopic = document.getElementById('NameAddedTopic');
        TogglePopUp(SensorAdded);
        InnerSensorTopic.type = 'password';
        if (InnerSensorTopic.value != '') {
            CurrentSocket.Socket.send(JSON.stringify(
                {
                    "mqtt_external_topic": InnerSensorTopic.value
                }
            ));
            InnerSensorDataTab.style.display = 'none';
            NameAddedTopic.innerText = InnerSensorTopic.value;
            AddedTopic.style.display = 'flex';
            this.style.display = 'none';
            DisconnectInnerSensorBtn.style.display = 'flex';
        }
    }
    DisconnectInnerSensorBtn.onclick = function () {
        CurrentSocket.Socket.send(JSON.stringify(
            {
                mqtt_external: "disconnect"
            }
        ));
    }
}
function ChangeTargetTemp() {
    let TypeWidgetTemp = CurrentSocket.type === 'esp8266_thermostat' ? document.getElementById('MainDisplayTermostat') : document.getElementById('MainDisplayConditioner');
    let MainMenuWidgetValueTemp = TypeWidgetTemp.getElementsByClassName('MainMenuWidgetValueTemp')[0];
    let MainMenuTempValue = TypeWidgetTemp.getElementsByClassName('MainMenuTempValue')[0];
    if (Number(CurrentSocket.config.is_target_temp_first)) {
        MainMenuWidgetValueTemp.innerHTML = CurrentSocket.update.target_temp + '°';
        MainMenuTempValue.innerHTML = CurrentSocket.update.temp  + '°';
    }
    else {
        MainMenuWidgetValueTemp.innerHTML = CurrentSocket.update.temp + '°';
        MainMenuTempValue.innerHTML = CurrentSocket.update.target_temp + '°';
    }

}
function InsertExternalInnerSensor() {
    if (CurrentSocket.config.mqtt_external_topic != '' && CurrentSocket.config.mqtt_external_topic != null) {
        let InnerSensorDataTab = document.getElementById('InnerSensorDataTab');
        InnerSensorDataTab.style.display = 'none';
        let NameAddedTopic = document.getElementById('NameAddedTopic');
        NameAddedTopic.innerText = CurrentSocket.config.mqtt_external_topic;
        DisconnectInnerSensorBtn.style.display = 'flex';
        ConnectInnerSensorBtn.style.display = 'none';
        AddedTopic.style.display = 'flex';
    }
}
function InsertMqtt() {
    let AdressMqtt = document.getElementById('AdressMqtt');
    let PortMqtt = document.getElementById('PortMqtt');
    let LoginMqtt = document.getElementById('LoginMqtt');
    let PasswordMqtt = document.getElementById('PasswordMqtt');
    let CopyIcon = '<svg width="9" height="13" viewBox="0 0 9 13" fill="none"><rect x = "0.5" y = "0.5" width = "6" height = "9" rx = "0.5" stroke = "white" /><rect x="2.5" y="3.5" width="6" height="9" rx="0.5" stroke="white" /></svg >';
    let MqttDeviceSettingItem = document.getElementById('InnerSensorSetting');
    if (CurrentSocket.config.homekit != '0') {
        MqttDeviceSettingItem.onclick = null;
        let MqttOnly = document.getElementById('OnlyMqtt');
        MqttOnly.style.display = 'flex';
    }
    let MqttSwitch = document.getElementById('MqttSwitch');
    let SwitchMQTTBtn = document.getElementById('SwitchMQTTBtn');
    let SwitchMqttComlete = document.getElementById('SwitchMqttComlete');
    if (CurrentSocket.config.homekit === '0') {
        MqttSwitch.style.display = 'none';
        SwitchMQTTBtn.style.display = 'none';
        if (CurrentSocket.mqtt_topics != '{}' & CurrentSocket.mqtt_topics != null) {
            var UpdateSocketBlock = document.getElementById('UpdateSocketBlock');
            var StateMqttTopic = document.getElementById('StateMqttTopic');
            var TargetTempMqttTopic = document.getElementById('TargetTempMqttTopic');
            var SetUpMqttTopic = document.getElementById('SetUpMqttTopic');
            var SetDownMqttTopic = document.getElementById('SetDownMqttTopic');
            var HeatingMqttTopic = document.getElementById('HeatingMqttTopic');
            StateMqttTopic.innerHTML = CurrentSocket.mqtt_topics.state + CopyIcon;
            TargetTempMqttTopic.innerHTML = CurrentSocket.mqtt_topics.target_temp + CopyIcon;
            SetUpMqttTopic.innerHTML = CurrentSocket.mqtt_topics.step_up + CopyIcon;
            SetDownMqttTopic.innerHTML = CurrentSocket.mqtt_topics.step_down + CopyIcon;
            HeatingMqttTopic.innerHTML = CurrentSocket.mqtt_topics.heating + CopyIcon;
            GetMQTTData.style.display = 'flex';
            AdressMqtt.value = CurrentSocket.config.mqtt_server;
            PortMqtt.value = CurrentSocket.config.mqtt_port;
            LoginMqtt.value = CurrentSocket.config.mqtt_login;
            var updateString = '{<br />&nbsp;&nbsp;"update": {<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "temp": ' + CurrentSocket.update.temp + ', <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "target_temp": ' + CurrentSocket.update.target_temp + ', <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "relay": ' + CurrentSocket.update.relay + ', <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"heating": ' + CurrentSocket.update.heating + ', <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "name": ' + CurrentSocket.update.name + ', <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "unit": ' + CurrentSocket.update.unit + ' <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;} <br />}';
            UpdateSocketBlock.innerHTML = updateString;
        }
        else {
            GetMQTTData.style.display = 'none';
        }
        if (CurrentSocket.config.mqtt_use === '1') {
            ConnectMQTTBtn.style.display = 'none';
            DisconnectMQTTBtn.style.display = 'block';
        }
        else {
            ConnectMQTTBtn.style.display = 'block';
            DisconnectMQTTBtn.style.display = 'none';
        }
    }
    else {
        MqttInputData.style.display = 'none';
        MqttSwitch.style.display = 'block';
        SwitchMQTTBtn.style.display = 'block';
        ConnectMQTTBtn.style.display = 'none';
    }
    SwitchMQTTBtn.onclick = function () {
        document.getElementById('DropUpSwitchMqtt').style.display = 'flex';
    }
    SwitchMqttComlete.onclick = function () {
        this.parentElement.parentElement.parentElement.style.display = 'none';
        SetLoader(5, function () { location.host = location.host; });
        CurrentSocket.Socket.send(JSON.stringify(
            {
                "config":
                {
                    "homekit": 0
                }
            }
        ));
    }
    ConnectMQTTBtn.onclick = function () {
        if (AdressMqtt.value != '' & PortMqtt.value != '' & LoginMqtt.value != '' & PasswordMqtt.value != '') {
            CurrentSocket.Socket.send(JSON.stringify(
                {
                    "mqtt_connect": {
                        "mqtt_server": AdressMqtt.value,
                        "mqtt_port": PortMqtt.value,
                        "mqtt_login": LoginMqtt.value,
                        "mqtt_password": PasswordMqtt.value
                    }
                }
            ));
            SetLoader(5, function () { location.host = location.host; });
        }
    }
    DisconnectMQTTBtn.onclick = function () {
        CurrentSocket.Socket.send(JSON.stringify({ "mqtt_disconnect": 1 }));
        SetLoader(5, function () { location.host = location.host; });
    }
    GetMQTTData.onclick = function () {
        SwitchElem(MqttInputData, MQTTReceivedInfo);
        ConnectMQTTBtn.style.display = 'none';
        DisconnectMQTTBtn.style.display = 'none';
    }
    if (CurrentSocket.config.mqtt_use === 'true') {
        document.getElementsByClassName('MqttConnect')[0].style.display = 'flex';
    }
    else {
        document.getElementsByClassName('MqttConnect')[0].style.display = 'none';
    }
}
function TabloTempInitialization() {
    MaxTablo = document.getElementById('TabloTempMax').querySelector('.ChangingTempTablo');
    MinTablo = document.getElementById('TabloTempMin').querySelector('.ChangingTempTablo');
    GisteresisTablo = document.getElementById('TabloTempGisteresis').querySelector('.ChangingTempTablo');
    CorrectionTablo = document.getElementById('TabloTempCorrection').querySelector('.ChangingTempTablo');
}
function InsertTemp() {
    GisteresisTablo.innerHTML = getKeyByValue(GisteresisInvertArray, GisteresisInvertArray[Number(CurrentSocket.config.hysteresis)]);
    CorrectionTablo.innerHTML = getKeyByValue(CorrectionInvertArray, CurrentSocket.config.sensor_corr);
    MaxTablo.innerHTML = CurrentSocket.config.max_temp;
    MinTablo.innerHTML = CurrentSocket.config.min_temp;
    ChangeTempPositionBtn.onclick = function () {
        let ChangeTempPositionPopUp = document.getElementById('ChangeTempPositionPopUp');
        TogglePopUp(ChangeTempPositionPopUp);
        if (CurrentSocket.config.is_target_temp_first === '0') {
            CurrentSocket.Socket.send(JSON.stringify(
                { is_target_temp_first: 0 }
            ));
        }
        else {
            CurrentSocket.Socket.send(JSON.stringify(
                { is_target_temp_first: 1 }
            ));
        }
    }
}
function PairHk() {
    let PairHomekit = document.getElementById('PairHomekit');
    let Qrcode = document.getElementById('qrcode');
    let BtnMenuHomekit = document.getElementById('BtnMenuHomekit');
    let SwitchHomekit = document.getElementById('SwitchHomekit');
    let SwitchHomekitBtn = document.getElementById('SwitchHomekitBtn');
    let DispairHomekit = document.getElementById('DispairHomekit');
    let NotQrcode = document.getElementById('NotQrcode');
    if (CurrentSocket.config.homekit === '1' || CurrentSocket.config.homekit === '2') {
        if (CurrentSocket.config.pair_hk === '0') {
            if (CurrentSocket.qr_hk != undefined) {
                Qrcode.innerHTML = '';
                var qrcode = new QRCode("qrcode", {
                    text: CurrentSocket.qr_hk,
                    width: 220,
                    height: 220,
                    colorDark: "#000000",
                    colorLight: "#ffffff",
                    correctLevel: QRCode.CorrectLevel.H
                });
                PairHomekit.style.display = 'block';
                NotQrcode.style.display = 'none';
                DispairHomekit.style.display = 'none';
            }
            else {
                NotQrcode.style.display = 'block';
                PairHomekit.style.display = 'none';
                Qrcode.innerHTML = '';
            }
            BtnMenuHomekit.style.display = 'none';
            SwitchHomekit.style.display = 'none';
        }
        else if (CurrentSocket.config.pair_hk === '1') {
            DispairHomekit.style.display = 'block';
            SwitchHomekit.style.display = 'none';
            SwitchHomekitBtn.style.display = 'none';
            PairHomekit.style.display = 'none';
            Qrcode.innerHTML = '';
        }
    } else {
        DispairHomekitBtn.style.display = 'none';
        SwitchHomekit.style.display = 'block';
        SwitchHomekitBtn.style.display = 'block';
        PairHomekit.style.display = 'none';
        Qrcode.innerHTML = '';
    }
    
    
    DispairHomekitBtn.onclick = function () {
        document.getElementById('DropUpHomekit').style.display = 'flex';
    }
    SwitchHomekitBtn.onclick = function () {
        document.getElementById('DropUpSwitch').style.display = 'flex';
    }
    DropHomekit.onclick = function () {
        this.parentElement.parentElement.parentElement.style.display = 'none';
        TogglePopUp(document.getElementById('DisconnectPopUpHomekit'));
        CurrentSocket.Socket.send(JSON.stringify(
            {
                "clear_homekit": 1
            }
        ));
        let SetTimeoutHomekit = function () {
            SetLoader(5, function () { location.host = location.host; })
        }
        setTimeout(SetTimeoutHomekit, 2000);
    }
    SwitchHomekitComlete.onclick = function () {
        this.parentElement.parentElement.parentElement.style.display = 'none';
        CurrentSocket.Socket.send(JSON.stringify(
            {
                "config":
                {
                    "homekit": 1
                }
            }
        ));
        SetLoader(5, function () { location.host = location.host; });
    }
}
function ZigBeeSet() {
    let ZigBeeExemple = {
        "id": "4294967293",
        "ip": "192.168.x.x",
        "type": "lytko_gateway",
        zoneId: 0,
        childrens: [
            {
                type: "mqtt",
                sensors: [
                    {
                        data: "3",
                        name: "0x021",
                        unit: "<sensorUnit>"
                    },
                    {
                        data: "4",
                        name: "0x4566",
                        unit: "<sensorUnit>"
                    },
                    {
                        data: "5",
                        name: "0x56282",
                        unit: "<sensorUnit>"
                    },
                    {
                        data: "6",
                        name: "0x9654",
                        unit: "<sensorUnit>"
                    }
                ]
            }
        ]
    }
    if (false) {
        for (let i = 0; CurrentSocket.ssdp.length > i; i++) {
            if (CurrentSocket.id === CurrentSocket.ssdp[i].id) {
                if (CurrentSocket.ssdp[i].type != 'lytko_gateway') {
                    for (let i = 0; ZigBeeExemple.childrens[0].sensors.length > i; i++) {
                        let SelectingBlock = document.createElement('div');
                        let ZigBeeSensor = document.createElement('div');
                        let SelectedIcon = document.createElement('div');
                        SelectingBlock.className = 'SelectingBlock';
                        ZigBeeSensor.className = 'ZigBeeSensor';
                        SelectedIcon.className = 'SelectedIcon';
                        SelectedIcon.innerHTML = '<svg width="20" height="15" viewBox="0 0 20 15" fill="none"><path d = "M0 8.13808L6.84888 15L20 1.86194L18.1119 0L6.84888 11.2499L1.86191 6.26303L0 8.13808Z" fill = "#2C98F0" /></svg >';
                        ZigBeeSensor.innerHTML = ZigBeeExemple.childrens[0].sensors[i].name;
                        SelectingBlock.append(ZigBeeSensor);
                        SelectingBlock.append(SelectedIcon);
                        SelectingBlock.onclick = function () {
                            SelectZigBeeSensor(this);
                        }
                        ZigBeeSensors.append(SelectingBlock);
                    }
                    let ZigBeeInfo = document.getElementsByClassName('ZigBeeInfo')[0];
                    ZigBeeInfo.style.display = 'none';
                    DisconnectBtnZigBee.onclick = function () {
                        CurrentSocket.Socket.send(JSON.stringify(
                            {
                                "clear_zigbee": index // index - порядковый номер сенсора, начиная с нуля
                            }
                        ));
                    }
                }
            }
        }
    }
    PairingBtnZigBee.onclick = function () {
        CurrentSocket.Socket.send(JSON.stringify(
            {
                pair_zigbee: 1
            }
        ));
        SetLoader(30, function () { location.host = location.host; });
    }
}
function SetLoader(time, func) {
    let Loader = document.getElementsByClassName('LoaderHandler')[0];
    Loader.style.display = 'block';
    let TimeLoader = time;
    let TimerId = setInterval(function () {
        TimeLoader = TimeLoader - 1;
        if (time < 500)
            Loader.children[1].innerHTML = TimeLoader + ' сек';
    }, 1000)
    if (func != null) {
        setTimeout(function () {
            Loader.style.display = 'none';
            TimerId = setInterval(() => { clearInterval(TimerId); func(); });
        }, time * 1000);
    } else {
        setTimeout(function () {
            Loader.style.display = 'none';
            TimerId = setInterval(() => { clearInterval(TimerId); });
        }, time * 1000);
    }
   
}
function SelectZigBeeSensor(item) {
    let checkedSelectedIcon = item.children[1].style.display;
    if (checkedSelectedIcon === 'none' || checkedSelectedIcon === '') {
        ZigBeeSensors.querySelectorAll('.SelectedIcon').forEach(item => item.style.display = 'none');
        item.children[1].style.display = 'block';
    }
    else {
        item.children[1].style.display = 'none';
    }
}
let HeatingIcon = '<svg width="16" height="20" viewBox="0 0 16 20" fill="none"><path d = "M14.86 10.2339C13.4205 6.38701 8.29518 6.17958 9.53296 0.588392C9.62465 0.173531 9.19372 -0.147043 8.8453 0.069816C5.51703 2.08755 3.12398 6.13244 5.13194 11.4313C5.29698 11.8651 4.80187 12.2705 4.44429 11.9876C2.78474 10.6959 2.61053 8.83846 2.75723 7.50902C2.81224 7.01873 2.18877 6.78302 1.92287 7.18845C1.29939 8.16903 0.666748 9.75304 0.666748 12.1385C1.01516 17.4185 5.352 19.0403 6.91069 19.2477C9.1387 19.54 11.5501 19.1157 13.283 17.4845C15.1901 15.6648 15.8869 12.7608 14.86 10.2339ZM6.35139 14.9765C7.6717 14.6465 8.35019 13.6659 8.53356 12.7985C8.83613 11.4502 7.65336 10.1302 8.45104 7.99931C8.75361 9.76247 11.4492 10.8656 11.4492 12.7891C11.5226 15.1745 9.01034 17.2205 6.35139 14.9765Z" fill = "white" /></svg >';
let Fan = '<svg width="19" height="19" viewBox="0 0 19 19" fill="none"><path d = "M5.47678 10.1066C5.36753 10.1066 5.30049 10.1066 5.23593 10.1066C3.95225 10.1066 2.66857 10.1066 1.38737 10.1066C1.28061 10.1066 1.17136 10.1017 1.06459 10.0793C0.841128 10.0371 0.689668 9.88316 0.684703 9.6597C0.672288 8.90488 0.64001 8.15255 0.843611 7.41015C1.3551 5.54547 2.99135 4.15502 4.9206 3.98122C6.42029 3.84465 7.69901 4.32634 8.76667 5.38159C8.78653 5.40146 8.80888 5.42132 8.86599 5.47346C8.86599 5.37663 8.86599 5.31455 8.86599 5.25248C8.86599 3.97377 8.86599 2.69754 8.86599 1.41882C8.86599 1.36668 8.8635 1.31702 8.86599 1.26488C8.88833 0.837815 9.05469 0.676423 9.48424 0.676423C10.1422 0.676423 10.8002 0.651594 11.4482 0.812985C13.7052 1.37413 15.2298 3.52684 14.9964 5.83845C14.8797 6.98309 14.4079 7.95888 13.5935 8.76832C13.5736 8.78819 13.5538 8.81053 13.5016 8.86764C13.5985 8.86764 13.6605 8.86764 13.7226 8.86764C15.0013 8.86764 16.2776 8.86764 17.5563 8.86764C17.601 8.86764 17.6481 8.86764 17.6928 8.86764C18.1323 8.88254 18.2987 9.05138 18.2987 9.48589C18.2987 10.1439 18.3235 10.8018 18.1621 11.4499C17.601 13.7044 15.4483 15.2289 13.1366 14.9955C11.992 14.8788 11.0162 14.4071 10.2068 13.5927C10.1869 13.5728 10.1646 13.5554 10.1075 13.5008C10.1075 13.5976 10.1075 13.6597 10.1075 13.7218C10.1075 14.9931 10.1075 16.2643 10.1075 17.5381C10.1075 17.5902 10.1099 17.6399 10.1075 17.692C10.0926 18.1315 9.92372 18.2978 9.48672 18.2954C8.82874 18.2954 8.17325 18.3177 7.52272 18.1588C5.61582 17.6895 4.1484 15.9962 3.97956 14.0471C3.84797 12.5399 4.33959 11.2612 5.39732 10.191C5.41222 10.1737 5.42712 10.1588 5.47678 10.1066ZM10.1199 1.91789C10.1149 1.95265 10.1075 1.97997 10.1075 2.00728C10.1075 3.73789 10.1075 5.47098 10.105 7.20159C10.105 7.30835 10.1596 7.3307 10.2415 7.3605C10.7307 7.54175 11.1205 7.84963 11.3961 8.29656C11.4607 8.40085 11.5153 8.5101 11.5749 8.61686C12.9604 8.11034 14.0752 6.54361 13.7152 4.71368C13.3651 2.93838 11.7661 1.82602 10.1199 1.91789ZM8.85357 17.0489C8.85854 17.0266 8.8635 17.0166 8.8635 17.0042C8.8635 15.2562 8.8635 13.5058 8.86847 11.7578C8.86847 11.656 8.81136 11.6386 8.73936 11.6138C8.24277 11.4325 7.85047 11.1197 7.57486 10.6678C7.51279 10.5685 7.46064 10.4617 7.40602 10.3574C6.02799 10.849 4.88832 12.4431 5.26821 14.2879C5.64065 16.1178 7.32905 17.1706 8.85357 17.0489ZM8.61521 7.39526C8.12359 6.02467 6.51216 4.84776 4.60278 5.28724C2.75547 5.71182 1.80699 7.43747 1.92866 8.87012C1.95845 8.87261 1.99073 8.86764 2.02301 8.86764C3.74865 8.86764 5.47429 8.86764 7.19993 8.87012C7.30422 8.87012 7.33153 8.82046 7.36133 8.73853C7.51527 8.31146 7.77101 7.95392 8.14097 7.68824C8.28995 7.58148 8.4563 7.49209 8.61521 7.39526ZM10.3508 11.5666C10.9318 13.1135 12.6922 14.1712 14.542 13.6423C16.3595 13.1234 17.1789 11.3829 17.0398 10.1066C16.9802 10.1066 16.9182 10.1066 16.8561 10.1066C16.208 10.1066 15.5625 10.1066 14.9144 10.1066C13.8815 10.1066 12.8486 10.1041 11.8157 10.1116C11.7512 10.1116 11.6494 10.1513 11.632 10.1985C11.4011 10.8366 10.9715 11.286 10.3508 11.5666ZM9.49417 10.5089C10.0578 10.5039 10.5097 10.047 10.5072 9.48341C10.5047 8.92226 10.0503 8.46789 9.48672 8.4654C8.92061 8.46292 8.4563 8.9322 8.46623 9.49831C8.47368 10.0619 8.93303 10.5138 9.49417 10.5089Z" fill = "#456FA6" /></svg >';
function CreateDeviceBlock(Socket, type) {
    let PlaceForDeviceBlock = document.getElementsByClassName('DeviceList')[0];
    let DeviceBlock = document.createElement('div');
    let DeviceBlockTitle = document.createElement('div');
    let DeviceBlockValue = document.createElement('div');
    let DeviceBlockControl = document.createElement('div');
    let DeviceBlockControlTablo = document.createElement('div');
    let DeviceBlockControlTabloFan = document.createElement('div');
    DeviceBlock.className = 'DeviceBlock';
    DeviceBlockTitle.className = 'DeviceBlockTitle';
    DeviceBlockValue.className = 'DeviceBlockValue';
    DeviceBlockControl.className = 'DeviceBlockControl';
    DeviceBlockControlTablo.className = 'DeviceBlockControlTablo';
    if (type === 'esp8266_thermostat') {
        DeviceBlockControlTablo.className = 'DeviceBlockControlTablo HeatingTermostatByID';
        DeviceBlockControlTablo.innerHTML = HeatingIcon;
        DeviceBlockControl.append(DeviceBlockControlTablo);
        DeviceBlockTitle.innerHTML = 'Термостат';
        DeviceBlock.id = Socket.id;
        DeviceBlock.append(DeviceBlockTitle);
        DeviceBlock.append(DeviceBlockValue);
        DeviceBlock.append(DeviceBlockControl);
        PlaceForDeviceBlock.append(DeviceBlock);
        DeviceBlock.onclick = function (event) {
            CurrentSocket = ArraySocket.find((item) => {
                if (item.id === this.id)
                    return item;
            });
            ShowMainMenuBySocket(CurrentSocket);
            SwitchElem(MainDisplay, MainDisplayTermostat);
        }
        DeviceBlockControlTablo.onclick = function (event) {
            event.stopPropagation();
            CurrentBlockID = this.parentElement.parentElement.id;
            TargetSocket = ArraySocket.find(item => item.id === CurrentBlockID);
            let Heating;
            if (TargetSocket != null) {
                Heating = TargetSocket.update.heating === 'heat' ? 0 : 1;
                this.style.background = Heating === 0 ? '#1F3C62' : '#035CD0';
                TargetSocket.Socket.send(JSON.stringify({
                    "heating": Heating
                }));
            }
        };
    }
    else {
        DeviceBlockControlTabloFan.className = 'DeviceBlockControlTablo FanHandlerMainDisplay';
        DeviceBlockControlTablo.className = 'DeviceBlockControlTablo AutoConditionerMainDisplay';
        DeviceBlockControlTablo.innerHTML = 'Auto';
        DeviceBlockControl.append(DeviceBlockControlTablo);
        DeviceBlockControl.append(DeviceBlockControlTabloFan);
        DeviceBlockTitle.innerHTML = 'Кондиционер';
        DeviceBlock.id = Socket.id;
        DeviceBlock.append(DeviceBlockTitle);
        DeviceBlock.append(DeviceBlockValue);
        DeviceBlock.append(DeviceBlockControl);
        PlaceForDeviceBlock.append(DeviceBlock);
        DeviceBlock.onclick = function (event) {
            event.stopPropagation();
            CurrentSocket = ArraySocket.find((item) => {
                if (item.id === this.id)
                    return item;
            });
            ShowMainMenuBySocket(CurrentSocket);
            SwitchElem(MainDisplay, MainDisplayConditioner);
        }
        DeviceBlockControlTablo.onclick = function () {
            event.stopPropagation();
            CurrentSocket = ArraySocket.find((item) => {
                if (item.id === this.parentElement.parentElement.id)
                    return item;
            });
            if (CurrentSocket != null) {
                let SocketData = CurrentSocket.update.heating === 'auto' ? '0' : '3';
                CurrentSocket.Socket.send(JSON.stringify({
                    "heating": SocketData
                }));
            }
        }
        DeviceBlockControlTabloFan.onclick = function () {
            event.stopPropagation();
            CurrentSocket = ArraySocket.find((item) => {
                if (item.id === this.parentElement.parentElement.id)
                    return item;
            });
            FanSetMainDisplay(CurrentSocket, this);
        }
    }
}
let FanIconsArray = {
    '0': '<svg width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M5.47678 10.1066C5.36753 10.1066 5.30049 10.1066 5.23593 10.1066C3.95225 10.1066 2.66857 10.1066 1.38737 10.1066C1.28061 10.1066 1.17136 10.1017 1.06459 10.0793C0.841128 10.0371 0.689668 9.88316 0.684703 9.6597C0.672288 8.90488 0.64001 8.15255 0.843611 7.41015C1.3551 5.54547 2.99135 4.15502 4.9206 3.98122C6.42029 3.84465 7.69901 4.32634 8.76667 5.38159C8.78653 5.40146 8.80888 5.42132 8.86599 5.47346C8.86599 5.37663 8.86599 5.31455 8.86599 5.25248C8.86599 3.97377 8.86599 2.69754 8.86599 1.41882C8.86599 1.36668 8.8635 1.31702 8.86599 1.26488C8.88833 0.837814 9.05469 0.676423 9.48424 0.676423C10.1422 0.676423 10.8002 0.651594 11.4482 0.812985C13.7052 1.37413 15.2298 3.52684 14.9964 5.83845C14.8797 6.98309 14.4079 7.95888 13.5935 8.76832C13.5736 8.78819 13.5538 8.81053 13.5016 8.86764C13.5985 8.86764 13.6605 8.86764 13.7226 8.86764C15.0013 8.86764 16.2776 8.86764 17.5563 8.86764C17.601 8.86764 17.6481 8.86764 17.6928 8.86764C18.1323 8.88254 18.2987 9.05138 18.2987 9.48589C18.2987 10.1439 18.3235 10.8018 18.1621 11.4499C17.601 13.7044 15.4483 15.2289 13.1366 14.9955C11.992 14.8788 11.0162 14.4071 10.2068 13.5927C10.1869 13.5728 10.1646 13.5554 10.1075 13.5008C10.1075 13.5976 10.1075 13.6597 10.1075 13.7218C10.1075 14.9931 10.1075 16.2643 10.1075 17.5381C10.1075 17.5902 10.1099 17.6399 10.1075 17.692C10.0926 18.1315 9.92372 18.2978 9.48672 18.2954C8.82874 18.2954 8.17325 18.3177 7.52272 18.1588C5.61582 17.6895 4.1484 15.9962 3.97956 14.0471C3.84797 12.5399 4.33959 11.2612 5.39732 10.191C5.41222 10.1737 5.42712 10.1588 5.47678 10.1066ZM10.1199 1.91789C10.1149 1.95265 10.1075 1.97997 10.1075 2.00728C10.1075 3.73789 10.1075 5.47098 10.105 7.20159C10.105 7.30835 10.1596 7.3307 10.2415 7.3605C10.7307 7.54175 11.1205 7.84963 11.3961 8.29656C11.4607 8.40085 11.5153 8.5101 11.5749 8.61686C12.9604 8.11034 14.0752 6.54361 13.7152 4.71368C13.3651 2.93838 11.7661 1.82602 10.1199 1.91789ZM8.85357 17.0489C8.85854 17.0266 8.8635 17.0166 8.8635 17.0042C8.8635 15.2562 8.8635 13.5058 8.86847 11.7578C8.86847 11.656 8.81136 11.6386 8.73936 11.6138C8.24277 11.4325 7.85047 11.1197 7.57486 10.6678C7.51279 10.5685 7.46064 10.4617 7.40602 10.3574C6.02799 10.849 4.88832 12.4431 5.26821 14.2879C5.64065 16.1178 7.32905 17.1706 8.85357 17.0489ZM8.61521 7.39526C8.12359 6.02467 6.51216 4.84776 4.60278 5.28724C2.75547 5.71182 1.80699 7.43747 1.92866 8.87012C1.95845 8.87261 1.99073 8.86764 2.02301 8.86764C3.74865 8.86764 5.47429 8.86764 7.19993 8.87012C7.30422 8.87012 7.33153 8.82046 7.36133 8.73853C7.51527 8.31146 7.77101 7.95392 8.14097 7.68824C8.28995 7.58148 8.4563 7.49209 8.61521 7.39526ZM10.3508 11.5666C10.9318 13.1135 12.6922 14.1712 14.542 13.6423C16.3595 13.1234 17.1789 11.3829 17.0398 10.1066C16.9802 10.1066 16.9182 10.1066 16.8561 10.1066C16.208 10.1066 15.5625 10.1066 14.9144 10.1066C13.8815 10.1066 12.8486 10.1041 11.8157 10.1116C11.7512 10.1116 11.6494 10.1513 11.632 10.1985C11.4011 10.8366 10.9715 11.286 10.3508 11.5666ZM9.49417 10.5089C10.0578 10.5039 10.5097 10.047 10.5072 9.48341C10.5047 8.92226 10.0503 8.46789 9.48672 8.4654C8.92061 8.46292 8.4563 8.9322 8.46623 9.49831C8.47368 10.0619 8.93303 10.5138 9.49417 10.5089Z" fill="#456FA6" /></svg >',
    '1': '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8.80989" cy="8.80989" r="1.46833" fill="#2C98F0" /><path d="M16.8858 9.57909V8.80996C16.8858 8.59759 16.7136 8.4254 16.5012 8.4254H12.0049C13.9181 7.08751 14.3845 4.452 13.0466 2.53879C12.255 1.40683 10.9603 0.733027 9.57909 0.734132H8.80996C8.59759 0.734132 8.4254 0.90632 8.4254 1.1187V5.61501C7.0875 3.70181 4.452 3.23543 2.53879 4.57333C1.40683 5.3649 0.733027 6.65958 0.734132 8.04084V8.80996C0.734132 9.02234 0.90632 9.19453 1.1187 9.19453H5.61501C4.48704 9.98663 3.81415 11.2773 3.81064 12.6556C3.81338 14.9907 5.70572 16.8831 8.04084 16.8858H8.80996C9.02234 16.8858 9.19453 16.7136 9.19453 16.5012V12.0049C10.5324 13.9181 13.1679 14.3845 15.0811 13.0466C16.2131 12.2551 16.8869 10.9604 16.8858 9.57909ZM9.19453 1.50326H9.57909C11.4906 1.5059 13.038 3.05766 13.0354 4.96914C13.0333 6.46749 12.0673 7.79433 10.642 8.25658C10.44 7.58109 9.88453 7.07034 9.19453 6.9256V1.50326ZM1.50326 8.4254V8.04084C1.50677 6.12937 3.0592 4.58265 4.97072 4.58616C6.46802 4.5889 7.79376 5.5542 8.25619 6.97829C7.58095 7.18033 7.07039 7.73564 6.9256 8.4254H1.50326ZM8.4254 16.1167H8.04084C6.12936 16.114 4.58193 14.5623 4.58457 12.6508C4.58664 11.1524 5.55262 9.8256 6.9779 9.36335C7.1799 10.0388 7.7354 10.5496 8.4254 10.6943V16.1167ZM8.80996 9.96366C8.17279 9.96366 7.65627 9.44714 7.65627 8.80996C7.65627 8.17279 8.17279 7.65627 8.80996 7.65627C9.44714 7.65627 9.96365 8.17279 9.96365 8.80996C9.96365 9.44714 9.44709 9.96366 8.80996 9.96366ZM12.6492 13.0338C11.1519 13.031 9.82617 12.0657 9.36374 10.6416C10.039 10.4396 10.5495 9.88429 10.6943 9.19453H16.1167V9.57909C16.1131 11.4906 14.5607 13.0373 12.6492 13.0338Z" fill="white" /></svg >',
    '2': '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8.80989" cy="8.80989" r="1.46833" fill="#2C98F0" /><path d="M8.80996 8.44295C8.80996 7.91268 8.70552 7.38761 8.5026 6.8977C8.29967 6.4078 8.00224 5.96266 7.62729 5.58771C7.25233 5.21275 6.80719 4.91532 6.31729 4.7124C5.82739 4.50947 5.30231 4.40503 4.77205 4.40503C4.24178 4.40503 3.71671 4.50947 3.2268 4.7124C2.7369 4.91532 2.29176 5.21275 1.91681 5.58771C1.54185 5.96266 1.24442 6.4078 1.0415 6.8977C0.838575 7.38761 0.734131 7.91268 0.734131 8.44295L4.77205 8.44295H8.80996Z" fill="#2C98F0"/><path d="M16.8858 9.57909V8.80996C16.8858 8.59759 16.7136 8.4254 16.5012 8.4254H12.0049C13.9181 7.08751 14.3845 4.452 13.0466 2.53879C12.255 1.40683 10.9603 0.733027 9.57909 0.734132H8.80996C8.59759 0.734132 8.4254 0.90632 8.4254 1.1187V5.61501C7.0875 3.70181 4.452 3.23543 2.53879 4.57333C1.40683 5.3649 0.733027 6.65958 0.734132 8.04084V8.80996C0.734132 9.02234 0.90632 9.19453 1.1187 9.19453H5.61501C4.48704 9.98663 3.81415 11.2773 3.81064 12.6556C3.81338 14.9907 5.70572 16.8831 8.04084 16.8858H8.80996C9.02234 16.8858 9.19453 16.7136 9.19453 16.5012V12.0049C10.5324 13.9181 13.1679 14.3845 15.0811 13.0466C16.2131 12.2551 16.8869 10.9604 16.8858 9.57909ZM9.19453 1.50326H9.57909C11.4906 1.5059 13.038 3.05766 13.0354 4.96914C13.0333 6.46749 12.0673 7.79433 10.642 8.25658C10.44 7.58109 9.88453 7.07034 9.19453 6.9256V1.50326ZM1.50326 8.4254V8.04084C1.50677 6.12937 3.0592 4.58265 4.97072 4.58616C6.46802 4.5889 7.79376 5.5542 8.25619 6.97829C7.58095 7.18033 7.07039 7.73564 6.9256 8.4254H1.50326ZM8.4254 16.1167H8.04084C6.12936 16.114 4.58193 14.5623 4.58457 12.6508C4.58664 11.1524 5.55262 9.8256 6.9779 9.36335C7.1799 10.0388 7.7354 10.5496 8.4254 10.6943V16.1167ZM8.80996 9.96366C8.17279 9.96366 7.65627 9.44714 7.65627 8.80996C7.65627 8.17279 8.17279 7.65627 8.80996 7.65627C9.44714 7.65627 9.96365 8.17279 9.96365 8.80996C9.96365 9.44714 9.44709 9.96366 8.80996 9.96366ZM12.6492 13.0338C11.1519 13.031 9.82617 12.0657 9.36374 10.6416C10.039 10.4396 10.5495 9.88429 10.6943 9.19453H16.1167V9.57909C16.1131 11.4906 14.5607 13.0373 12.6492 13.0338Z" fill="white"/></svg >',
    '3': '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8.80989" cy="8.80989" r="1.46833" fill="#2C98F0" /><path d="M8.80996 8.44295C8.80996 7.91268 8.70552 7.38761 8.5026 6.8977C8.29967 6.4078 8.00224 5.96266 7.62729 5.58771C7.25233 5.21275 6.80719 4.91532 6.31729 4.7124C5.82739 4.50947 5.30231 4.40503 4.77205 4.40503C4.24178 4.40503 3.71671 4.50947 3.2268 4.7124C2.7369 4.91532 2.29176 5.21275 1.91681 5.58771C1.54185 5.96266 1.24442 6.4078 1.0415 6.8977C0.838575 7.38761 0.734131 7.91268 0.734131 8.44295L4.77205 8.44295H8.80996Z" fill="#2C98F0"/><path d="M9.17708 8.80996C9.70734 8.80996 10.2324 8.70552 10.7223 8.5026C11.2122 8.29967 11.6574 8.00224 12.0323 7.62729C12.4073 7.25233 12.7047 6.80719 12.9076 6.31729C13.1105 5.82739 13.215 5.30231 13.215 4.77205C13.215 4.24178 13.1105 3.71671 12.9076 3.2268C12.7047 2.7369 12.4073 2.29176 12.0323 1.91681C11.6574 1.54185 11.2122 1.24442 10.7223 1.0415C10.2324 0.838575 9.70734 0.734131 9.17708 0.734131L9.17708 4.77205L9.17708 8.80996Z" fill="#2C98F0"/><path d="M16.8858 9.57909V8.80996C16.8858 8.59759 16.7136 8.4254 16.5012 8.4254H12.0049C13.9181 7.08751 14.3845 4.452 13.0466 2.53879C12.255 1.40683 10.9603 0.733027 9.57909 0.734132H8.80996C8.59759 0.734132 8.4254 0.90632 8.4254 1.1187V5.61501C7.0875 3.70181 4.452 3.23543 2.53879 4.57333C1.40683 5.3649 0.733027 6.65958 0.734132 8.04084V8.80996C0.734132 9.02234 0.90632 9.19453 1.1187 9.19453H5.61501C4.48704 9.98663 3.81415 11.2773 3.81064 12.6556C3.81338 14.9907 5.70572 16.8831 8.04084 16.8858H8.80996C9.02234 16.8858 9.19453 16.7136 9.19453 16.5012V12.0049C10.5324 13.9181 13.1679 14.3845 15.0811 13.0466C16.2131 12.2551 16.8869 10.9604 16.8858 9.57909ZM9.19453 1.50326H9.57909C11.4906 1.5059 13.038 3.05766 13.0354 4.96914C13.0333 6.46749 12.0673 7.79433 10.642 8.25658C10.44 7.58109 9.88453 7.07034 9.19453 6.9256V1.50326ZM1.50326 8.4254V8.04084C1.50677 6.12937 3.0592 4.58265 4.97072 4.58616C6.46802 4.5889 7.79376 5.5542 8.25619 6.97829C7.58095 7.18033 7.07039 7.73564 6.9256 8.4254H1.50326ZM8.4254 16.1167H8.04084C6.12936 16.114 4.58193 14.5623 4.58457 12.6508C4.58664 11.1524 5.55262 9.8256 6.9779 9.36335C7.1799 10.0388 7.7354 10.5496 8.4254 10.6943V16.1167ZM8.80996 9.96366C8.17279 9.96366 7.65627 9.44714 7.65627 8.80996C7.65627 8.17279 8.17279 7.65627 8.80996 7.65627C9.44714 7.65627 9.96365 8.17279 9.96365 8.80996C9.96365 9.44714 9.44709 9.96366 8.80996 9.96366ZM12.6492 13.0338C11.1519 13.031 9.82617 12.0657 9.36374 10.6416C10.039 10.4396 10.5495 9.88429 10.6943 9.19453H16.1167V9.57909C16.1131 11.4906 14.5607 13.0373 12.6492 13.0338Z" fill="white"/></svg >',
    '4': '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8.80989" cy="8.80989" r="1.46833" fill="#2C98F0" /><path d="M8.80996 8.44295C8.80996 7.91268 8.70552 7.38761 8.5026 6.8977C8.29967 6.4078 8.00224 5.96266 7.62729 5.58771C7.25233 5.21275 6.80719 4.91532 6.31729 4.7124C5.82739 4.50947 5.30231 4.40503 4.77205 4.40503C4.24178 4.40503 3.71671 4.50947 3.2268 4.7124C2.7369 4.91532 2.29176 5.21275 1.91681 5.58771C1.54185 5.96266 1.24442 6.4078 1.0415 6.8977C0.838575 7.38761 0.734131 7.91268 0.734131 8.44295L4.77205 8.44295H8.80996Z" fill="#2C98F0"/><path d="M9.17708 8.80996C9.70734 8.80996 10.2324 8.70552 10.7223 8.5026C11.2122 8.29967 11.6574 8.00224 12.0323 7.62729C12.4073 7.25233 12.7047 6.80719 12.9076 6.31729C13.1105 5.82739 13.215 5.30231 13.215 4.77205C13.215 4.24178 13.1105 3.71671 12.9076 3.2268C12.7047 2.7369 12.4073 2.29176 12.0323 1.91681C11.6574 1.54185 11.2122 1.24442 10.7223 1.0415C10.2324 0.838575 9.70734 0.734131 9.17708 0.734131L9.17708 4.77205L9.17708 8.80996Z" fill="#2C98F0"/><path d="M8.80991 9.17708C8.80991 9.70734 8.91435 10.2324 9.11728 10.7223C9.3202 11.2122 9.61763 11.6574 9.99259 12.0323C10.3675 12.4073 10.8127 12.7047 11.3026 12.9076C11.7925 13.1105 12.3176 13.215 12.8478 13.215C13.3781 13.215 13.9032 13.1105 14.3931 12.9076C14.883 12.7047 15.3281 12.4073 15.7031 12.0323C16.078 11.6574 16.3754 11.2122 16.5784 10.7223C16.7813 10.2324 16.8857 9.70734 16.8857 9.17708L12.8478 9.17708L8.80991 9.17708Z" fill="#2C98F0"/><path d="M16.8858 9.57909V8.80996C16.8858 8.59759 16.7136 8.4254 16.5012 8.4254H12.0049C13.9181 7.08751 14.3845 4.452 13.0466 2.53879C12.255 1.40683 10.9603 0.733027 9.57909 0.734132H8.80996C8.59759 0.734132 8.4254 0.90632 8.4254 1.1187V5.61501C7.0875 3.70181 4.452 3.23543 2.53879 4.57333C1.40683 5.3649 0.733027 6.65958 0.734132 8.04084V8.80996C0.734132 9.02234 0.90632 9.19453 1.1187 9.19453H5.61501C4.48704 9.98663 3.81415 11.2773 3.81064 12.6556C3.81338 14.9907 5.70572 16.8831 8.04084 16.8858H8.80996C9.02234 16.8858 9.19453 16.7136 9.19453 16.5012V12.0049C10.5324 13.9181 13.1679 14.3845 15.0811 13.0466C16.2131 12.2551 16.8869 10.9604 16.8858 9.57909ZM9.19453 1.50326H9.57909C11.4906 1.5059 13.038 3.05766 13.0354 4.96914C13.0333 6.46749 12.0673 7.79433 10.642 8.25658C10.44 7.58109 9.88453 7.07034 9.19453 6.9256V1.50326ZM1.50326 8.4254V8.04084C1.50677 6.12937 3.0592 4.58265 4.97072 4.58616C6.46802 4.5889 7.79376 5.5542 8.25619 6.97829C7.58095 7.18033 7.07039 7.73564 6.9256 8.4254H1.50326ZM8.4254 16.1167H8.04084C6.12936 16.114 4.58193 14.5623 4.58457 12.6508C4.58664 11.1524 5.55262 9.8256 6.9779 9.36335C7.1799 10.0388 7.7354 10.5496 8.4254 10.6943V16.1167ZM8.80996 9.96366C8.17279 9.96366 7.65627 9.44714 7.65627 8.80996C7.65627 8.17279 8.17279 7.65627 8.80996 7.65627C9.44714 7.65627 9.96365 8.17279 9.96365 8.80996C9.96365 9.44714 9.44709 9.96366 8.80996 9.96366ZM12.6492 13.0338C11.1519 13.031 9.82617 12.0657 9.36374 10.6416C10.039 10.4396 10.5495 9.88429 10.6943 9.19453H16.1167V9.57909C16.1131 11.4906 14.5607 13.0373 12.6492 13.0338Z" fill="white"/></svg >',
    '5': '<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8.80989" cy="8.80989" r="1.46833" fill="#2C98F0" /><path d="M8.80996 8.44295C8.80996 7.91268 8.70552 7.38761 8.5026 6.8977C8.29967 6.4078 8.00224 5.96266 7.62729 5.58771C7.25233 5.21275 6.80719 4.91532 6.31729 4.7124C5.82739 4.50947 5.30231 4.40503 4.77205 4.40503C4.24178 4.40503 3.71671 4.50947 3.2268 4.7124C2.7369 4.91532 2.29176 5.21275 1.91681 5.58771C1.54185 5.96266 1.24442 6.4078 1.0415 6.8977C0.838575 7.38761 0.734131 7.91268 0.734131 8.44295L4.77205 8.44295H8.80996Z" fill="#2C98F0"/><path d="M9.17708 8.80996C9.70734 8.80996 10.2324 8.70552 10.7223 8.5026C11.2122 8.29967 11.6574 8.00224 12.0323 7.62729C12.4073 7.25233 12.7047 6.80719 12.9076 6.31729C13.1105 5.82739 13.215 5.30231 13.215 4.77205C13.215 4.24178 13.1105 3.71671 12.9076 3.2268C12.7047 2.7369 12.4073 2.29176 12.0323 1.91681C11.6574 1.54185 11.2122 1.24442 10.7223 1.0415C10.2324 0.838575 9.70734 0.734131 9.17708 0.734131L9.17708 4.77205L9.17708 8.80996Z" fill="#2C98F0"/><path d="M8.80991 9.17708C8.80991 9.70734 8.91435 10.2324 9.11728 10.7223C9.3202 11.2122 9.61763 11.6574 9.99259 12.0323C10.3675 12.4073 10.8127 12.7047 11.3026 12.9076C11.7925 13.1105 12.3176 13.215 12.8478 13.215C13.3781 13.215 13.9032 13.1105 14.3931 12.9076C14.883 12.7047 15.3281 12.4073 15.7031 12.0323C16.078 11.6574 16.3754 11.2122 16.5784 10.7223C16.7813 10.2324 16.8857 9.70734 16.8857 9.17708L12.8478 9.17708L8.80991 9.17708Z" fill="#2C98F0"/><path d="M8.44304 8.80991C7.91277 8.80991 7.3877 8.91435 6.8978 9.11728C6.40789 9.3202 5.96276 9.61763 5.5878 9.99259C5.21285 10.3675 4.91542 10.8127 4.71249 11.3026C4.50957 11.7925 4.40512 12.3176 4.40512 12.8478C4.40512 13.3781 4.50957 13.9032 4.71249 14.3931C4.91542 14.883 5.21285 15.3281 5.5878 15.7031C5.96276 16.078 6.40789 16.3754 6.8978 16.5784C7.3877 16.7813 7.91277 16.8857 8.44304 16.8857L8.44304 12.8478L8.44304 8.80991Z" fill="#2C98F0"/><path d="M16.8858 9.57909V8.80996C16.8858 8.59759 16.7136 8.4254 16.5012 8.4254H12.0049C13.9181 7.08751 14.3845 4.452 13.0466 2.53879C12.255 1.40683 10.9603 0.733027 9.57909 0.734132H8.80996C8.59759 0.734132 8.4254 0.90632 8.4254 1.1187V5.61501C7.0875 3.70181 4.452 3.23543 2.53879 4.57333C1.40683 5.3649 0.733027 6.65958 0.734132 8.04084V8.80996C0.734132 9.02234 0.90632 9.19453 1.1187 9.19453H5.61501C4.48704 9.98663 3.81415 11.2773 3.81064 12.6556C3.81338 14.9907 5.70572 16.8831 8.04084 16.8858H8.80996C9.02234 16.8858 9.19453 16.7136 9.19453 16.5012V12.0049C10.5324 13.9181 13.1679 14.3845 15.0811 13.0466C16.2131 12.2551 16.8869 10.9604 16.8858 9.57909ZM9.19453 1.50326H9.57909C11.4906 1.5059 13.038 3.05766 13.0354 4.96914C13.0333 6.46749 12.0673 7.79433 10.642 8.25658C10.44 7.58109 9.88453 7.07034 9.19453 6.9256V1.50326ZM1.50326 8.4254V8.04084C1.50677 6.12937 3.0592 4.58265 4.97072 4.58616C6.46802 4.5889 7.79376 5.5542 8.25619 6.97829C7.58095 7.18033 7.07039 7.73564 6.9256 8.4254H1.50326ZM8.4254 16.1167H8.04084C6.12936 16.114 4.58193 14.5623 4.58457 12.6508C4.58664 11.1524 5.55262 9.8256 6.9779 9.36335C7.1799 10.0388 7.7354 10.5496 8.4254 10.6943V16.1167ZM8.80996 9.96366C8.17279 9.96366 7.65627 9.44714 7.65627 8.80996C7.65627 8.17279 8.17279 7.65627 8.80996 7.65627C9.44714 7.65627 9.96365 8.17279 9.96365 8.80996C9.96365 9.44714 9.44709 9.96366 8.80996 9.96366ZM12.6492 13.0338C11.1519 13.031 9.82617 12.0657 9.36374 10.6416C10.039 10.4396 10.5495 9.88429 10.6943 9.19453H16.1167V9.57909C16.1131 11.4906 14.5607 13.0373 12.6492 13.0338Z" fill="white"/></svg >'
}
function FanSetMainDisplay(Socket, Fan) {
    let CurrentFanSpeed = Socket.update.fan_speed;
    let TargetFanSpeed = CurrentFanSpeed < 5 ? CurrentFanSpeed + 1 : 0;
    Fan.innerHTML = FanIconsArray[TargetFanSpeed];
    if (CurrentSocket != null) {
        Socket.Socket.send(JSON.stringify({
            "fan_speed": TargetFanSpeed
        }));
    }
}
function HeatingRegulate() {
    let Heating = CurrentSocket.update.heating === 'heat' ? 1 : 0;
    HeatingTermostat.style.background = Heating === 0 ? '#1F3C62' : '#035CD0';
    HeatingTermostat.onclick = function () {
        Heating = CurrentSocket.update.heating === 'heat' ? 0 : 1;
        this.style.background = Heating === 0 ? '#1F3C62' : '#035CD0';
        CurrentSocket.Socket.send(JSON.stringify({
            "heating": Heating
        }));
    }
}
function ShowWifiList(WifiList) {
    var WifiListPlace = document.getElementsByClassName('WifiSelecting')[0];
    document.querySelectorAll('.WifiBlock').forEach(e => e.remove());
    var WifiName;
    var GuardTypeWifi;
    var WifiIcon;
    var InfoWifiBlock;
    var WifiBlock;
    for (var k = 0; WifiList.length > k; k++) {
        WifiName = document.createElement('div');
        GuardTypeWifi = document.createElement('div');
        WifiIcon = document.createElement('div');
        InfoWifiBlock = document.createElement('div');
        WifiBlock = document.createElement('div');

        WifiName.className = 'WifiName';
        GuardTypeWifi.className = 'GuardTypeWifi';
        WifiIcon.className = 'WifiIcon';
        InfoWifiBlock.className = 'InfoWifiBlock';
        WifiBlock.className = 'WifiBlock SelectingBlock';
        WifiName.innerHTML = WifiList[k].ssid;
        GuardTypeWifi.innerHTML = WifiDefCollection[WifiList[k].encryption];
        if (WifiList[k].signal != undefined)
            WifiIcon.innerHTML = WifiIconArray[DetermineWifiSignal(WifiList[k].signal)];
        InfoWifiBlock.append(WifiName);
        InfoWifiBlock.append(GuardTypeWifi);
        WifiBlock.append(InfoWifiBlock);
        WifiBlock.append(WifiIcon);
        WifiListPlace.append(WifiBlock);
        WifiBlock.onclick = function () {
            WifiSelected = this;
            let SelectedWifiName = this.querySelectorAll('.WifiName')[0].innerHTML;
            if (this.querySelectorAll('.GuardTypeWifi')[0].innerHTML != 'Открытая сеть') {
                if (FirstConfigurate) {
                    SwitchElem(OneStageSettingDissapearElem, TwoStageSettingDissapearElem);
                    WifiConnectBtn.onclick = function () {
                        let passwordCheck = document.getElementById('PasswordFirstSetting');
                        if (passwordCheck.value.length > 0) {
                            SwitchElem(TwoStageSettingDissapearElem, ThreeStageSettingDissapearElem);
                            WifiPassword = passwordCheck.value;
                            configTermostat.config.wifi_pass = WifiPassword;
                            configConditioner.config.wifi_pass = WifiPassword;
                        }
                    }
                }
                else {
                    let WifiSelectingList = document.getElementsByClassName('WifiSelecting')[0];
                    let WifiMenuBlock = document.getElementsByClassName('WifiMenuBlock')[0];
                    let ConnecthWifiMainMenu = document.getElementById('ConnecthWifiMainMenu');
                    let RefreshWifiList = document.getElementById('RefreshWifiList');
                    SwitchElem(WifiSelectingList, WifiMenuBlock);
                    SwitchElem(RefreshWifiList, ConnecthWifiMainMenu);
                    ConnecthWifiMainMenu.onclick = function () {
                        let passwordCheck = document.getElementById('PasswordFirstSetting');
                        if (passwordCheck.value.length > 0) {
                            CurrentSocket.Socket.send(JSON.stringify(
                                {
                                    wifi_connect:
                                    {
                                        ssid: SelectedWifiName,
                                        password: passwordCheck.value
                                    }
                                }
                            ));
                        }
                    }
                }
                configTermostat.config.wifi_name = this.querySelectorAll('.WifiName')[0].innerHTML;
                configConditioner.config.wifi_name = this.querySelectorAll('.WifiName')[0].innerHTML;
            }
            else {
                SwitchElem(OneStageSettingDissapearElem, ThreeStageSettingDissapearElem);
                WifiSelected = this;
                config.config.wifi_name = SelectedWifiName;
            }
        }
    }
}
function DetermineWifiSignal(WifiSignal) {
    let result;
    if (WifiSignal != -1) {
        if (WifiSignal > 100) {
            result = 3;
        } else {
            let determineResult = Math.floor(WifiSignal / 25);
            result = determineResult === 4 ? 3 : determineResult;
        }
        
    }
    else
        result = 4
    return result;
}
WifiRefreshBtn.onclick = sendRefreshWifi;
function sendRefreshWifi() {
    ArraySocket[0].Socket.send(JSON.stringify(
        {
            wifi_refresh: 1
        }
    ));
}
function NavigationDevice() {
    BackToSettings.forEach(item => item.onclick = NavSettings);
    SettingItems.forEach(item => item.id === 'DeviceName' ? false : item.onclick = NavItem);
    ResetSettings.onclick = function () {
        document.getElementById('DropUpMain').style.display = 'flex';
    }
    SettingIcon.forEach(item => item.onclick = function () {
        if (CurrentSocket.type === 'esp8266_thermostat') {
            SwitchElem(MainDisplayTermostat, DeviceSettings);
            DeviceSettings.querySelector('#ConditionerSetting').style.display = 'none';
            DeviceSettings.querySelector('#ZigBeeSetting').style.display = 'none';
            DeviceSettings.querySelector('#InnerSensorSetting').style.display = 'flex';
            DeviceSettings.querySelector('#GisteresisSetting').style.display = 'flex';
            DeviceSettings.querySelector('#TypeSensorSetting').style.display = 'flex';
        }
        else {
            SwitchElem(MainDisplayConditioner, DeviceSettings);
            DeviceSettings.querySelector('#ZigBeeSetting').style.display = 'none';
            DeviceSettings.querySelector('#InnerSensorSetting').style.display = 'none';
            DeviceSettings.querySelector('#GisteresisSetting').style.display = 'none';
            DeviceSettings.querySelector('#TypeSensorSetting').style.display = 'none';
            DeviceSettings.querySelector('#ConditionerSetting').style.display = 'flex';
        }
    })
    BackToMainDevicePage.onclick = function () {
        if (CurrentSocket.type === 'esp8266_thermostat') {
            SwitchElem(DeviceSettings, MainDisplayTermostat);
        }
        else {
            SwitchElem(DeviceSettings, MainDisplayConditioner);
        }
    }
    DropUpWindowClose.forEach(item => item.onclick = function () { this.parentElement.parentElement.parentElement.style.display = 'none'; })
}
function NavSettings() {
    let ComposedStyle = getComputedStyle(MQTTReceivedInfo);
    if (this.parentElement.parentElement.id === 'MQTTPage' & ComposedStyle.display != 'none') {
        SwitchElem(MQTTReceivedInfo, MqttInputData);
        //ConnectMQTTBtn.style.display = 'flex';
        DisconnectMQTTBtn.style.display = 'flex';
    }
    else
        SwitchElem(this.parentElement.parentElement, DeviceSettings);
}
function NavItem() {
    if (this.className === 'SettingItem InDevelop') {
        TogglePopUp(InDevelop)
    }
    else {
        SwitchElem(DeviceSettings, document.getElementsByClassName(this.id)[0]);
    }
}
function NavMainDisplay() { SwitchElem(this.parentElement.parentElement.parentElement, MainDisplay); }
function TogglePopUp(PopUpToggle) {
    PopUpToggle.classList.toggle("show");

    let BodyTag = document.body;
    BodyTag.classList.toggle('shadowBody');
    let TimeOutToggle = setTimeout(FadeOutPopUp, 3000);
    function FadeOutPopUp() {
        PopUpToggle.classList.toggle("show");
        BodyTag.classList.toggle('shadowBody');
    }
    PopUpToggle.onclick = function () {
        clearTimeout(TimeOutToggle);
        PopUpToggle.classList.toggle("show");
        BodyTag.classList.toggle('shadowBody');
    }
    
}
function ShowInDevelop() {
    TogglePopUp(InDevelop);
}
function AliceSet() {
    let AliceLoginGroup = document.querySelectorAll('.AliceLoginGroup');
    let AliceShowIcon = document.getElementById('AliceShowIcon');
    AliceShowIcon.style.display = 'none';
    if (ArraySocket[0].config != null) {
        if (ArraySocket[0].config.mqtt_alice === '0' || ArraySocket[0].config.mqtt_alice === undefined) {
            AliceLoginGroup.forEach(item => item.style.display = 'flex');
        }
        else {
            let AliceLogOutGroup = document.querySelectorAll('.AliceLogOutGroup');
            let AliceAdded = document.getElementById('AliceAdded');
            AliceAdded.querySelector('.InputInfo').innerHTML = ArraySocket[0].config.alice_login;
            AliceLogOutGroup.forEach(item => item.style.display = 'block');
            AliceLoginGroup.forEach(item => item.style.display = 'none');
        }
    }
    AliceLogIn.onclick = function () {
        let LoginAlice = document.getElementById('LoginAlice');
        let PasswordAlice = document.getElementById('PasswordAlice');
        if (LoginAlice.value.length > 0 & PasswordAlice.value.length > 0) {
            for (let i = 0; ArraySocket.length > i; i++) {
                ArraySocket[i].Socket.send(JSON.stringify(
                    {
                        "alice_connect":
                        {
                            "alice_login": LoginAlice.value,
                            "alice_password": PasswordAlice.value
                        }
                    }
                ));
            }

        }
    }
    if (ArraySocket[0].config != undefined) {
        let AliceOnlyMqtt = document.getElementById('AliceOnlyMqtt');
        if (ArraySocket[0].config.homekit === '0') {
            AliceOnlyMqtt.style.display = 'block';
            AliceLink.onclick = null;
        } else {
            AliceOnlyMqtt.style.display = 'none';
        }
    }
    AliceLogOut.onclick = function () {
        for (let i = 0; ArraySocket.length > i; i++) {
            ArraySocket[i].Socket.send(JSON.stringify({ "alice_disconnect": 1 }));
        }

    };
    AliceInfoPopUp.onclick = function (event) {
        event.stopPropagation();
        DropUpAliceInfo.style.display = 'flex';
    }
    CloseAliceInfo.onclick = function () {
        DropUpAliceInfo.style.display = 'none';
    }
    AliceShowPass.onclick = function () {
        let AliceShowIcon = document.getElementById('AliceShowIcon');
        let AliceNotShowIcon = document.getElementById('AliceNotShowIcon');
        let PasswordAlice = document.getElementById('PasswordAlice');
        if (PasswordAlice.type === 'password') {
            PasswordAlice.type = 'text';
            AliceNotShowIcon.style.display = 'none';
            AliceShowIcon.style.display = 'block';
        } else {
            PasswordAlice.type = 'password';
            AliceNotShowIcon.style.display = 'block';
            AliceShowIcon.style.display = 'none';
        }
    }
}
BlocksInfo.forEach(item => item.onclick = function () {
    CopyBy(this.getElementsByClassName('BlockInformation')[0]);
    let BlockTouggle = document.getElementById('CopyMqttString');
    TogglePopUp(BlockTouggle);
});
function CopyBy(item) {
    var copyText = item.innerText;
    let CreateElemTextArea = document.createElement('textarea');
    CreateElemTextArea.innerText = copyText;
    document.body.append(CreateElemTextArea);
    CreateElemTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(CreateElemTextArea);
}
