/**
 * @Description:Makefile
 * @Author: Geno
 * @Date: 2020-04-12
 */
module.exports = `

# 为 %PRODUCT_NAME% 生成
# 此工程的根目录
ROOT_DIR := /home/geno/SOURCE/nRF52-Keyboard

# 特殊目录控制
SDK_ROOT := $(ROOT_DIR)/SDK
TEMPLATE_PATH := $(ROOT_DIR)/template

# 配置文件文件名
CONFIG_H = config.h
CONFIG_H_DIR = .
SRC_FILES += keymap_plain.c

include ./rules.mk

INC_FOLDERS += .

APP_MAIN_DIR := $(ROOT_DIR)/application/main
TMK_CORE_DIR := $(ROOT_DIR)/tmk/tmk_core
USB_SOURCE_DIR := $(ROOT_DIR)/usb

APP_PROJ_DIR := $(APP_MAIN_DIR)/project
APP_SRC_DIR := $(APP_MAIN_DIR)/src

all: default ch554

include $(APP_PROJ_DIR)/kbd.mk
include $(USB_SOURCE_DIR)/usb.mk

`.trim()
