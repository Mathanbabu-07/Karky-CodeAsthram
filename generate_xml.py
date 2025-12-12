import argparse
from playwright.sync_api import sync_playwright
import time
import hashlib

def generate_aquarium_xml_script():
    return """
    () => {
        const workspace = Blockly.getMainWorkspace();
        workspace.clear();
        const fish_var = workspace.createVariable('fish');
        const plants_var = workspace.createVariable('plants');
        const pumps_var = workspace.createVariable('pumps');
        const required_support_var = workspace.createVariable('required_support');
        let lastBlock = null;
        const set_fish = workspace.newBlock('essentials_var_set');
        set_fish.setFieldValue(fish_var.getId(), 'VAR');
        const cast_fish = workspace.newBlock('variables_cast');
        cast_fish.setFieldValue('int', 'TYPE');
        const input_fish = workspace.newBlock('essentials_safe_input');
        const text_fish = workspace.newBlock('text');
        text_fish.setFieldValue('Enter number of fish: ', 'TEXT');
        input_fish.getInput('PROMPT').connection.connect(text_fish.outputConnection);
        cast_fish.getInput('VALUE').connection.connect(input_fish.outputConnection);
        set_fish.getInput('VALUE').connection.connect(cast_fish.outputConnection);
        lastBlock = set_fish;
        const set_plants = workspace.newBlock('essentials_var_set');
        set_plants.setFieldValue(plants_var.getId(), 'VAR');
        const cast_plants = workspace.newBlock('variables_cast');
        cast_plants.setFieldValue('int', 'TYPE');
        const input_plants = workspace.newBlock('essentials_safe_input');
        const text_plants = workspace.newBlock('text');
        text_plants.setFieldValue('Enter number of aquatic plants: ', 'TEXT');
        input_plants.getInput('PROMPT').connection.connect(text_plants.outputConnection);
        cast_plants.getInput('VALUE').connection.connect(input_plants.outputConnection);
        set_plants.getInput('VALUE').connection.connect(cast_plants.outputConnection);
        lastBlock.nextConnection.connect(set_plants.previousConnection);
        lastBlock = set_plants;
        const set_pumps = workspace.newBlock('essentials_var_set');
        set_pumps.setFieldValue(pumps_var.getId(), 'VAR');
        const cast_pumps = workspace.newBlock('variables_cast');
        cast_pumps.setFieldValue('int', 'TYPE');
        const input_pumps = workspace.newBlock('essentials_safe_input');
        const text_pumps = workspace.newBlock('text');
        text_pumps.setFieldValue('Enter number of oxygen pumps: ', 'TEXT');
        input_pumps.getInput('PROMPT').connection.connect(text_pumps.outputConnection);
        cast_pumps.getInput('VALUE').connection.connect(input_pumps.outputConnection);
        set_pumps.getInput('VALUE').connection.connect(cast_pumps.outputConnection);
        lastBlock.nextConnection.connect(set_pumps.previousConnection);
        lastBlock = set_pumps;
        const set_req_support = workspace.newBlock('essentials_var_set');
        set_req_support.setFieldValue(required_support_var.getId(), 'VAR');
        const div_req_support = workspace.newBlock('essentials_num_arithmetic');
        div_req_support.setFieldValue('FLOOR_DIVIDE', 'OP');
        const get_fish = workspace.newBlock('essentials_var_get');
        get_fish.setFieldValue(fish_var.getId(), 'VAR');
        const num_2 = workspace.newBlock('essentials_num_literal');
        num_2.setFieldValue(2, 'NUM');
        div_req_support.getInput('A').connection.connect(get_fish.outputConnection);
        div_req_support.getInput('B').connection.connect(num_2.outputConnection);
        set_req_support.getInput('VALUE').connection.connect(div_req_support.outputConnection);
        lastBlock.nextConnection.connect(set_req_support.previousConnection);
        lastBlock = set_req_support;
        const if_block = workspace.newBlock('controls_if');
        const else_block = workspace.newBlock('controls_if');
        if_block.nextConnection.connect(else_block.previousConnection);
        const and_logic = workspace.newBlock('essentials_logic_and');
        const compare_plants = workspace.newBlock('essentials_compare');
        compare_plants.setFieldValue('GTE', 'OP');
        const get_plants = workspace.newBlock('essentials_var_get');
        get_plants.setFieldValue(plants_var.getId(), 'VAR');
        const get_req_support1 = workspace.newBlock('essentials_var_get');
        get_req_support1.setFieldValue(required_support_var.getId(), 'VAR');
        compare_plants.getInput('A').connection.connect(get_plants.outputConnection);
        compare_plants.getInput('B').connection.connect(get_req_support1.outputConnection);
        const compare_pumps = workspace.newBlock('essentials_compare');
        compare_pumps.setFieldValue('GTE', 'OP');
        const get_pumps = workspace.newBlock('essentials_var_get');
        get_pumps.setFieldValue(pumps_var.getId(), 'VAR');
        const get_req_support2 = workspace.newBlock('essentials_var_get');
        get_req_support2.setFieldValue(required_support_var.getId(), 'VAR');
        compare_pumps.getInput('A').connection.connect(get_pumps.outputConnection);
        compare_pumps.getInput('B').connection.connect(get_req_support2.outputConnection);
        and_logic.getInput('A').connection.connect(compare_plants.outputConnection);
        and_logic.getInput('B').connection.connect(compare_pumps.outputConnection);
        if_block.getInput('IF0').connection.connect(and_logic.outputConnection);
        const print_healthy = workspace.newBlock('text_print');
        const text_healthy = workspace.newBlock('text');
        text_healthy.setFieldValue('✅ Your aquarium is balanced and healthy!', 'TEXT');
        print_healthy.getInput('TEXT').connection.connect(text_healthy.outputConnection);
        if_block.getInput('DO0').connection.connect(print_healthy.previousConnection);
        const print_unhealthy = workspace.newBlock('text_print');
        const text_unhealthy = workspace.newBlock('text');
        text_unhealthy.setFieldValue('⚠️ Your aquarium needs more plants or pumps to be healthy.', 'TEXT');
        print_unhealthy.getInput('TEXT').connection.connect(text_unhealthy.outputConnection);
        else_block.getInput('DO0').connection.connect(print_unhealthy.previousConnection);
        lastBlock.nextConnection.connect(if_block.previousConnection);
        workspace.getAllBlocks(false).forEach(b => { b.initSvg(); b.render(); });
        workspace.getTopBlocks(true)[0].moveBy(10, 10);
        const dom = Blockly.Xml.workspaceToDom(workspace, true);
        return Blockly.Xml.domToText(dom);
    }
    """

def generate_digestive_path_xml_script():
    return """
    () => {
        const workspace = Blockly.getMainWorkspace();
        workspace.clear();
        const digestive_path_var = workspace.createVariable('digestive_path');
        const part_var = workspace.createVariable('part');
        let lastBlock = null;
        const set_list = workspace.newBlock('essentials_var_set');
        set_list.setFieldValue(digestive_path_var.getId(), 'VAR');
        const list_create = workspace.newBlock('essentials_list_create');
        const mutation = document.createElement('mutation');
        mutation.setAttribute('items', '6');
        list_create.domToMutation(mutation);
        const items = ["Mouth", "Oesophagus", "Stomach", "Small Intestine", "Large Intestine", "Anus"];
        items.forEach((item, index) => {
            const text_block = workspace.newBlock('text');
            text_block.setFieldValue(item, 'TEXT');
            list_create.getInput('ADD' + index).connection.connect(text_block.outputConnection);
        });
        set_list.getInput('VALUE').connection.connect(list_create.outputConnection);
        lastBlock = set_list;
        const print_start = workspace.newBlock('text_print');
        const text_start = workspace.newBlock('text');
        text_start.setFieldValue("The food's journey begins!", 'TEXT');
        print_start.getInput('TEXT').connection.connect(text_start.outputConnection);
        lastBlock.nextConnection.connect(print_start.previousConnection);
        lastBlock = print_start;
        const print_divider1 = workspace.newBlock('text_print');
        const text_divider1 = workspace.newBlock('text');
        text_divider1.setFieldValue('-------------------------', 'TEXT');
        print_divider1.getInput('TEXT').connection.connect(text_divider1.outputConnection);
        lastBlock.nextConnection.connect(print_divider1.previousConnection);
        lastBlock = print_divider1;
        const for_each = workspace.newBlock('controls_forEach');
        for_each.setFieldValue(part_var.getId(), 'VAR');
        const get_list = workspace.newBlock('essentials_var_get');
        get_list.setFieldValue(digestive_path_var.getId(), 'VAR');
        for_each.getInput('LIST').connection.connect(get_list.outputConnection);
        const print_part = workspace.newBlock('text_print');
        const concat_part = workspace.newBlock('text_concat');
        const text_arrow = workspace.newBlock('text');
        text_arrow.setFieldValue('→ Now entering the: ', 'TEXT');
        const get_part = workspace.newBlock('essentials_var_get');
        get_part.setFieldValue(part_var.getId(), 'VAR');
        concat_part.getInput('ADD0').connection.connect(text_arrow.outputConnection);
        concat_part.getInput('ADD1').connection.connect(get_part.outputConnection);
        print_part.getInput('TEXT').connection.connect(concat_part.outputConnection);
        for_each.getInput('DO').connection.connect(print_part.previousConnection);
        lastBlock.nextConnection.connect(for_each.previousConnection);
        lastBlock = for_each;
        const print_divider2 = workspace.newBlock('text_print');
        const text_divider2 = workspace.newBlock('text');
        text_divider2.setFieldValue('-------------------------', 'TEXT');
        print_divider2.getInput('TEXT').connection.connect(text_divider2.outputConnection);
        lastBlock.nextConnection.connect(print_divider2.previousConnection);
        lastBlock = print_divider2;
        const print_end = workspace.newBlock('text_print');
        const text_end = workspace.newBlock('text');
        text_end.setFieldValue('The journey is complete!', 'TEXT');
        print_end.getInput('TEXT').connection.connect(text_end.outputConnection);
        lastBlock.nextConnection.connect(print_end.previousConnection);
        workspace.getAllBlocks(false).forEach(b => { b.initSvg(); b.render(); });
        workspace.getTopBlocks(true)[0].moveBy(10, 10);
        const dom = Blockly.Xml.workspaceToDom(workspace, true);
        return Blockly.Xml.domToText(dom);
    }
    """

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--template", required=True, choices=["aquarium_ecosystem", "digestive_path"])
    parser.add_argument("--debug", action="store_true")
    args = parser.parse_args()

    if args.template == "aquarium_ecosystem":
        script_func = generate_aquarium_xml_script
        output_file = "src/templates/aquarium_ecosystem.xml"
    elif args.template == "digestive_path":
        script_func = generate_digestive_path_xml_script
        output_file = "src/templates/digestive_path.xml"
    else:
        print(f"Unknown template: {args.template}")
        return

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            page.goto("http://localhost:5173", timeout=15000)
            page.wait_for_selector(".blocklyWorkspace", timeout=15000)

            script = script_func()
            xml_output = page.evaluate(script)

            with open(output_file, "w") as f:
                f.write(xml_output)

            if args.debug:
                print(f"Generation completed successfully for {args.template}")
                print(f"Output file: {output_file}")
                # Calculate and print checksum
                hasher = hashlib.md5()
                hasher.update(xml_output.encode('utf-8'))
                print(f"MD5 Checksum: {hasher.hexdigest()}")

        except Exception as e:
            if args.debug:
                print(f"An error occurred during generation for {args.template}: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    main()
