export function catchInput(length) {
    let all = this.config.$input.value.split(" ")
    if (typeof length === "number") {
        if (length < 0) return all[all.length + length]
        else return all[length]
    }
    
    // TODO  FIXME
    else if (length === "the_latest_selector_variable") {
        all = catchInput(-1).split("[")[1].split(",")
        return all[all.length - 1]
    } else if (length === "selector_variable_value") {
        return catchInput("the_latest_selector_variable").split("=")[1]
        
    }
    
    else return all
}