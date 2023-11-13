const isCompatible = (prev, next) => {
  if (prev === '-') {
    if (next === '|' || next === '=') {
      return false
    }
    return true
  }
  if (prev === '=') {
    if (next === '/' || next === '|') {
      return false
    }
    return true
  }
  if (prev === '|') {
    if (next === '/' || next === '=') {
      return false
    }
    return true
  }
  if (prev === '/') {
    if (next === '=') {
      return false
    }
    return true
  }
  if (prev === '<') {
    if (next === '<' || next === '>') {
      return false
    }
    return true
  }
  if (prev === '>') {
    if (next === '<' || next === '>') {
      return false
    }
    return true
  }
  if (prev === ' ') {
    if (next === ' ' || next === '  ') {
      return false
    }
    return true
  }
  if (prev === '  ') {
    if (next === ' ' || next === '  ') {
      return false
    }
    return true
  }
  return true
}

const getNextChar = (lastChar) => {
  const randFactor = Math.floor(Math.random()*8+1)
  const nextChar = () => {
      switch(randFactor) {
      case 1: return ' '
      case 2: return '  '
      case 3: return '|'
      case 4: return '-'
      case 5: return '-'
      case 6: return '-'

      default: return '-'
    }
  }
  if(isCompatible(lastChar, nextChar())) {
    return nextChar()
  } else {
    return getNextChar(lastChar)
  }
}

export const generateString = (len, startChar) => {
  let lastChar = startChar
  let finalStr = startChar
  for(let i = 0; i <= len; i++) {
    lastChar = getNextChar(lastChar)
    finalStr += lastChar
  }
  return finalStr
}
