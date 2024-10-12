import json
import os
import logging

# 设置日志
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def split_json_file(input_file, output_dir):
    # 读取输入的JSON文件
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        logging.error(f"找不到输入文件: {input_file}")
        return
    except json.JSONDecodeError:
        logging.error(f"无法解析JSON文件: {input_file}")
        return

    # 获取en目录下的所有JSON文件名
    try:
        en_files = [f for f in os.listdir('messages/en') if f.endswith('.json')]
    except FileNotFoundError:
        logging.error("找不到 messages/en 目录")
        return

    if not en_files:
        logging.warning("messages/en 目录中没有找到JSON文件")

    # 为每个en文件创建对应的翻译文件
    for en_file in en_files:
        output_data = {}
        file_prefix = en_file[:-5]  # 移除.json后缀
        
        # 从主JSON中提取对应的翻译
        for key, value in data.items():
            if key.startswith(file_prefix + '.'):
                new_key = key[len(file_prefix) + 1:]
                output_data[new_key] = value
            elif '.' not in key:  # 处理没有前缀的键
                output_data[key] = value

        # 如果没有找到匹配的翻译，记录警告
        if not output_data:
            logging.warning(f"在 {input_file} 中没有找到与 {en_file} 匹配的翻译")
            continue

        # 创建输出目录(如果不存在)
        os.makedirs(output_dir, exist_ok=True)
        
        # 写入新的JSON文件
        output_file = os.path.join(output_dir, en_file)
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=2)
        
        logging.info(f"已创建文件: {output_file}")

# 处理每种语言
languages = ['ja', 'zh', 'pt']
for lang in languages:
    input_file = f'messages/{lang}.json'
    output_dir = f'messages/{lang}'
    logging.info(f"正在处理语言: {lang}")
    split_json_file(input_file, output_dir)

logging.info("翻译文件拆分完成。")