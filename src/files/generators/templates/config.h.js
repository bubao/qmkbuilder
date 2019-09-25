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

#ifndef CONFIG_H
#define CONFIG_H

#include <stdint.h>

/* USB Device descriptor parameter */
#define VENDOR_ID 0x1209 /* USB VID */
#define PRODUCT_ID 0x0514 /* USB PID */
#define DEVICE_VER 0x0001 /* 硬件版本 */
#define MANUFACTURER "Lotlab" /* 硬件制造商，用于蓝牙显示 */
#define PRODUCT "%PRODUCT_NAME%" /* 硬件名词，用于蓝牙显示 */
#define MACADDR_SEPRATOR '_' /* 蓝牙名称后地址的分隔符。若不设置则不显示蓝牙名称后面的地址 */

/* USB HID report parameter */
#define KEYBOARD_EPSIZE 8 /* 键盘上传端点大小，请不要修改 */
#define NKRO_EPSIZE 28 /* 键盘NKRO端点大小，请不要修改 */

/* key matrix size */
#define MATRIX_ROWS %MATRIX_ROWS% /* 硬件阵列行数 */
#define MATRIX_COLS %MATRIX_COLS% /* 硬件阵列列数 */

/* define if matrix has ghost */
// #define MATRIX_HAS_GHOST /* 按键阵列是否出现Ghost Key，若没有加二极管则需要启用这个项目 */

/* Set 0 if debouncing isn't needed */
#define DEBOUNCE 5 /* 硬件消抖次数 */

/* Mechanical locking support. Use KC_LCAP, KC_LNUM or KC_LSCR instead in keymap */
#define LOCKING_SUPPORT_ENABLE
/* Locking resynchronize hack */
#define LOCKING_RESYNC_ENABLE

/* key combination for command */
#define IS_COMMAND() ( \
    keyboard_report->mods == (MOD_BIT(KC_LSHIFT) | MOD_BIT(KC_RSHIFT)))

// 定义Bootmagic按键
#define BOOTMAGIC_KEY_BOOT KC_U /* 开机按键 */
#define BOOTMAGIC_KEY_ERASE_BOND KC_E /* 删除所有绑定的按键 */

// 键盘省电参数
#define SLEEP_SLOW_TIMEOUT %SLEEP_SLOW_TIMEOUT% // 键盘闲置多久后转入慢速扫描模式 (15s)
#define SLEEP_OFF_TIMEOUT %SLEEP_OFF_TIMEOUT% // 键盘闲置多久后转入自动关机 (600s)
#define KEYBOARD_SCAN_INTERVAL 1 // 按键消抖时长 (ms)
#define KEYBOARD_FAST_SCAN_INTERVAL 10 // 通常模式下，多久扫描一次键盘 (ms)
#define KEYBOARD_SLOW_SCAN_INTERVAL 100 // 慢速模式下，多久扫描一次键盘 (ms)

// LED自动熄灭时长(5000ms)，设为0则不自动熄灭
#define LED_AUTOOFF_TIME %LED_AUTOOFF_TIME%

// 需要输入配对码 true?'':'//'
%PASSKEY_REQUIRED%#define PASSKEY_REQUIRED

// 更改发射功率到+4dBm
#define HIGH_TX_POWER
// 动态连接功率
// #define DYNAMIC_TX_POWER
// 启用多设备切换
#define Multi_DEVICE_SWITCH

// 启用看门狗
#define ENABLE_WATCHDOG

// 启用keymap存储
#define KEYMAP_STORAGE

// 直接开机而跳过开机条件检测，用于调试
// #define DEBUG_SKIP_PWRON_CHECK

/* disable action features */
//#define NO_ACTION_LAYER
//#define NO_ACTION_TAPPING
//#define NO_ACTION_ONESHOT
//#define NO_ACTION_MACRO
//#define NO_ACTION_FUNCTION

// LED 配置
// ws2812 RGB 配置
%Hiden_RGB_DI_PIN%#define RGBLED_NUM %RGBLED_NUM% // 8
%Hiden_LED_CAPS%#define LED_CAPS %LED_CAPS% // 21
%Hiden_RGB_DI_PIN%#define RGBLIGHT_ENABLE
%Hiden_RGB_DI_PIN%#define RGB_DI_PIN %RGB_DI_PIN% // 10
%Hiden_RGB_DI_PIN%#define RGBLIGHT_ANIMATIONS

// 启用 LED 状态灯
%Hiden_LED_BLE%#define LED_BLE %LED_BLE%  // 19
%Hiden_LED_CHARGING%#define LED_CHARGING %LED_CHARGING% //18
%Hiden_LED_USB%#define LED_USB %LED_USB% // 20

// 独立硬件按钮
%Hiden_POWER_BUTTON%#define POWER_BUTTON %POWER_BUTTON% // 3

// USB UART 传输配置
#define HAS_USB // 启用与CH554的通信支持
#define UART_RXD %UART_RXD% // UART_RX口IO 17
#define UART_TXD %UART_TXD% // UART_TX口IO 18
#define UART0_BUAD 115200
#define UART_BAUDRATE NRF_UART_BAUDRATE_115200 // 通信波特率，请不要修改
#define CH55X_FREQ_SYS 24000000

// 电量检测配置 Pin 2
#define BATTERY_ADC_PIN NRF_SAADC_INPUT_AIN0 // 电量检测引脚

// 充电检测配置
#define PIN_CHARGING !UCC1 // CH554的充电检测。当UCC1拉低时表示正在充电
//#define PIN_STANDBY !UCC2 // CH554的充电检测。当UCC2拉低时表示充电完成。若不配置则只使用PIN_CHARGING作为是否充电的检测标志

// 按键阵列配置
static const uint8_t row_pin_array[MATRIX_ROWS] = { %row_pins% };
static const uint8_t column_pin_array[MATRIX_COLS] = { %col_pins% };
#define %diode_direction% // 键盘阵列的二极管方向是从COL->ROW

#define LED_POSITIVE // LED上拉驱动

#endif
`.trim()
