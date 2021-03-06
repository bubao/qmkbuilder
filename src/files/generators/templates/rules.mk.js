module.exports = `

# 配置项：主控芯片类型
# 可选：nrf52810 或 nrf52832
NRF_CHIP := %nrf_chip%

# 配置项：功能选项
# BOOTMAGIC_ENABLE = yes	# 启用Bootmagic
EXTRAKEY_ENABLE = yes	    # 启用媒体键功能
NKRO_ENABLE = yes	        # 启用USB的全键无冲功能
USB_6KRO_ENABLE = yes     # 启用USB的六键无冲功能
COMMAND_ENABLE = yes        # 启用调试和配置的命令
ifeq (nrf52832,$(strip $(NRF_CHIP)))
%rgblight_enable%RGBLIGHT_ENABLE = yes       #启用RGB灯
endif
STATUS_LED_ENABLE = yes     #启用键盘运行状态灯

`.trim();
