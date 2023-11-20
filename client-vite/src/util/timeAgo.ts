const timeAgoFromString = (dateString: string): string => {
  try {
    const date = new Date(dateString).getTime()
    const now = new Date().getTime()
    const deltaSeconds = Math.floor((now - date) / 1000)

    let delta = deltaSeconds;
    let unit = 'seconds'
    if (deltaSeconds > 60 && deltaSeconds < 60 * 60) {
      unit = 'minutes'; delta = Math.floor(deltaSeconds / 60)
    }
    else if (deltaSeconds > 60 * 60 && deltaSeconds <= 60 * 60 * 24) {
      unit = 'hours';
      delta = Math.floor(deltaSeconds / (60 * 60))
    }
    else if (deltaSeconds > 60 * 60 * 24 && deltaSeconds <= 60 * 60 * 24 * 7) {
      unit = 'days'; 
      delta = Math.floor(deltaSeconds / (60 * 60 * 24))
    }
    else if (deltaSeconds > 60 * 60 * 24 * 7 && deltaSeconds <= 60 * 60 * 24 * 7 * 30) {
      unit = 'weeks'; 
      delta = Math.floor(deltaSeconds / (60 * 60 * 24 * 7))
    }
    else if (deltaSeconds > 60 * 60 * 24 * 30 && deltaSeconds <= 60 * 60 * 24 * 30 * 12) {
      unit = 'months'; 
      delta = Math.floor(deltaSeconds / (60 * 60 * 24 * 30))
    }
    else if (deltaSeconds > 60 * 60 * 24 * 365) {
      unit = 'years'; 
      delta = Math.floor(deltaSeconds / (60 * 60 * 24 * 365))
    }

    if (delta === 1) unit = unit.slice(0, unit.length - 1)

    return `${delta} ${unit} ago`
  } catch {
    return ''
  }
}

export default timeAgoFromString