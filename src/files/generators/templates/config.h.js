/**
 * @Description:config
 * @Author: bubao
 * @Date: 2019-09-16 13:35:12
 * @LastEditors: bubao
 * @LastEditTime: 2019-09-16 13:43:50
 */
module.exports = `
/*
Copyright 2012 Jun Wako <wakojun@gmail.com>
Copyright 2019 Jim Jiang <jim@lotlab.org>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

#pragma once

#include <stdint.h>

/* USB和蓝牙的显示参数 */
#define VENDOR_ID 0x1209 /* USB VID */
#define PRODUCT_ID 0x0514 /* USB PID */
#define CONF_VENDOR_ID %CONF_VENDOR_ID% /* 配置项目内显示的VendorID */
#define CONF_PRODUCT_ID %CONF_PRODUCT_ID% /* 配置项目内显示的ProductID */
#define DEVICE_VER 0x0001 /* 硬件版本 */
#define MANUFACTURER "Lotlab" /* 硬件制造商，用于蓝牙显示 */
#define PRODUCT "%PRODUCT_NAME%" /* 硬件名称，用于USB和蓝牙显示 */
%macaddr_name%#define MACADDR_SEPRATOR ' ' /* 蓝牙名称后地址的分隔符。若不设置则不显示蓝牙名称后面的地址 */

/* USB HID report parameter */
#define KEYBOARD_EPSIZE 8 /* 键盘上传端点大小，请不要修改 */
#define NKRO_EPSIZE 28 /* 键盘NKRO端点大小，请不要修改 */

// 定义Bootmagic按键
#define BOOTMAGIC_KEY_BOOT KC_U /* 开机 */
#define BOOTMAGIC_KEY_ERASE_BOND KC_E /* 删除所有绑定 */

// 键盘省电参数
#define SLEEP_SLOW_TIMEOUT %SLEEP_SLOW_TIMEOUT% // 键盘闲置多久后转入慢速扫描模式 (s)
#define SLEEP_OFF_TIMEOUT %SLEEP_OFF_TIMEOUT% // 键盘闲置多久后转入自动关机 (s)
#define KEYBOARD_SCAN_INTERVAL 1 // 键盘最小时间单位TICK (ms)
#define KEYBOARD_FAST_SCAN_INTERVAL %scan_interval% // 通常模式下，多久扫描一次键盘 (ms)
#define KEYBOARD_SLOW_SCAN_INTERVAL %KEYBOARD_SLOW_SCAN_INTERVAL% // 慢速模式下，多久扫描一次键盘 (ms)
#define LED_AUTOOFF_TIME %LED_AUTOOFF_TIME% /* LED自动熄灭时长(s)，设为0则不自动熄灭 */

// 键盘额外功能
//#define DYNAMIC_TX_POWER /* 启用自动发射功率调整 */
%passkey_required%#define PASSKEY_REQUIRED /* 需要输入配对码 */
#define ENABLE_WATCHDOG /* 启用看门狗 */
%high_tx_power%#define HIGH_TX_POWER /* 更改发射功率到+4dBm */
#define MULTI_DEVICE_SWITCH  /*启用多设备切换 */
#define KEYMAP_STORAGE /* 启用keymap存储 */
// #define MACRO_BLOCKING_MODE /* 在宏播放时禁用其他按键输入 */
#define MACRO_STORAGE /* 启用宏存储功能 */
#define CONFIG_STORAGE /* 启用配置存储功能 */
//#define BUTTONLESS_DFU /* 启用免按钮DFU */

// #define DEBUG_SKIP_PWRON_CHECK /*  直接开机而跳过开机条件检测，用于调试 */

/* TMK固件内置功能 */
/* disable action features */
//#define NO_ACTION_LAYER
//#define NO_ACTION_TAPPING
//#define NO_ACTION_ONESHOT
//#define NO_ACTION_MACRO
//#define NO_ACTION_FUNCTION

/* key combination for command */
#define IS_COMMAND() ( \
    keyboard_report->mods == (MOD_BIT(KC_LSHIFT) | MOD_BIT(KC_RSHIFT)))
// LED 配置
%Hiden_LED_CAPS%#define LED_CAPS %LED_CAPS% // 21

// ws2812 RGB 配置
%chip_func%%rgb_enable%#define RGBLED_NUM %RGBLED_NUM% // 8
%chip_func%%rgb_enable%#define RGB_DI_PIN %RGB_DI_PIN% // 10
%chip_func%%rgb_enable%#define RGBLIGHT_ANIMATIONS
%Hiden_RGB_PWR_PIN%#define RGB_PWR_PIN %RGB_PWR_PIN% // P-mos
%Hiden_RGB_PWR_PIN_REVERSE%#define RGB_PWR_PIN_REVERSE %RGB_PWR_PIN_REVERSE% // N-mos

// 启用 LED 状态灯
%Hiden_LED_BLE%#define LED_STATUS_BLE %LED_BLE%
%Hiden_LED_CHARGING%#define LED_STATUS_CHARGING %LED_CHARGING%
%Hiden_LED_USB%#define LED_STATUS_USB %LED_USB%
%Hiden_BLE_LED_1%#define LED_BLE_CHANNEL1 %BLE_LED_1%
%Hiden_BLE_LED_2%#define LED_BLE_CHANNEL2 %BLE_LED_2%
%Hiden_BLE_LED_3%#define LED_BLE_CHANNEL3 %BLE_LED_3%
#define LED_POSITIVE // LED上拉驱动

// 独立硬件按钮
%Hiden_POWER_BUTTON%#define POWER_BUTTON %POWER_BUTTON% // 3

// USB UART 传输配置
#define HAS_USB // 启用与CH554的通信支持
#define UART_RXD %UART_RXD% // UART_RX口IO 17
#define UART_TXD %UART_TXD% // UART_TX口IO 18
//#define UART_DET 19 // UART 检测引脚，若此脚被拉低，则说明USB正在工作。若不配置则使用RX口作为检测引脚
#define UART_BAUDRATE NRF_UART_BAUDRATE_115200 // 通信波特率，请不要修改
#define CH55X_FREQ_SYS 24000000

// 电量检测配置
#define BATTERY_ADC_PIN NRF_SAADC_INPUT_AIN0 // 电量检测引脚 Pin 2

// 充电检测配置
%CHARGING_DETECT%#define PIN_CHARGING !UCC1
//#define PIN_STANDBY !UCC2

// 按键阵列配置
#define MATRIX_ROWS %MATRIX_ROWS% /* 硬件阵列行数 */
#define MATRIX_COLS %MATRIX_COLS% /* 硬件阵列列数 */
static const uint8_t row_pin_array[MATRIX_ROWS] = { %row_pins% };
static const uint8_t column_pin_array[MATRIX_COLS] = { %col_pins% };
#define %diode_direction% // 键盘阵列的二极管方向是从COL->ROW

/* define if matrix has ghost */
// #define MATRIX_HAS_GHOST /* 按键阵列是否出现Ghost Key，若没有加二极管则需要启用这个项目 */

#define DEBOUNCE 5 /* 硬件消抖次数，设置为0则不消抖 */
#define MATRIX_SCAN_DELAY_CYCLE 48 /* 按键扫描等待IO稳定的延时时长 */
`.trim()
