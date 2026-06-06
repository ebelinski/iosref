document.addEventListener('DOMContentLoaded', function() {
  let activeTooltip = null;

  function createTooltip(target) {
    const text = target.getAttribute('data-tooltip');
    if (!text) return null;

    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    return tooltip;
  }

  function positionTooltip(target, tooltip) {
    const targetRect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    // Position above target, centered horizontally
    let top = targetRect.top + window.scrollY - tooltipRect.height - 8;
    let left = targetRect.left + window.scrollX + (targetRect.width - tooltipRect.width) / 2;

    // Check bounds
    const margin = 10;
    const minLeft = window.scrollX + margin;
    const maxLeft = window.innerWidth + window.scrollX - tooltipRect.width - margin;

    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;

    if (top < window.scrollY) {
      // If it goes off top of viewport, position it below the target instead
      top = targetRect.bottom + window.scrollY + 8;
    }

    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  }

  function positionTooltipAtCursor(e, tooltip) {
    const tooltipRect = tooltip.getBoundingClientRect();
    
    // Position 15px above cursor, centered horizontally on cursor
    let top = e.pageY - tooltipRect.height - 15;
    let left = e.pageX - tooltipRect.width / 2;

    // Check bounds
    const margin = 10;
    const minLeft = window.scrollX + margin;
    const maxLeft = window.innerWidth + window.scrollX - tooltipRect.width - margin;

    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;

    if (top < window.scrollY + margin) {
      // Position below cursor instead if it goes off top of viewport
      top = e.pageY + 20;
    }

    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  }

  function showTooltip(target, e) {
    if (activeTooltip) {
      hideTooltip();
    }
    const tooltip = createTooltip(target);
    if (!tooltip) return;

    activeTooltip = tooltip;
    tooltip.style.display = 'block';
    
    if (e && (e.type === 'mouseover' || e.type === 'mousemove') && window.matchMedia('(hover: hover)').matches) {
      positionTooltipAtCursor(e, tooltip);
    } else {
      positionTooltip(target, tooltip);
    }
    
    // Force reflow
    tooltip.offsetHeight;
    tooltip.classList.add('visible');
  }

  function hideTooltip() {
    if (activeTooltip) {
      const tooltipToRemoval = activeTooltip;
      activeTooltip = null;
      tooltipToRemoval.classList.remove('visible');
      setTimeout(() => {
        if (tooltipToRemoval.parentNode) {
          tooltipToRemoval.parentNode.removeChild(tooltipToRemoval);
        }
      }, 150);
    }
  }

  // Event delegation for desktop hover & mouse movement
  document.addEventListener('mouseover', function(e) {
    const target = e.target.closest('.tooltip');
    if (target && window.matchMedia('(hover: hover)').matches) {
      showTooltip(target, e);
    }
  });

  document.addEventListener('mousemove', function(e) {
    const target = e.target.closest('.tooltip');
    if (target && window.matchMedia('(hover: hover)').matches) {
      if (!activeTooltip) {
        showTooltip(target, e);
      } else {
        positionTooltipAtCursor(e, activeTooltip);
      }
    } else if (activeTooltip && window.matchMedia('(hover: hover)').matches) {
      hideTooltip();
    }
  });

  document.addEventListener('mouseout', function(e) {
    const target = e.target.closest('.tooltip');
    if (target && window.matchMedia('(hover: hover)').matches) {
      hideTooltip();
    }
  });

  // Event delegation for mobile tap
  document.addEventListener('click', function(e) {
    const target = e.target.closest('.tooltip');
    if (target) {
      if (!window.matchMedia('(hover: hover)').matches || e.pointerType === 'touch') {
        e.preventDefault();
        e.stopPropagation();
        if (activeTooltip) {
          hideTooltip();
        } else {
          showTooltip(target, e);
        }
      }
    } else {
      hideTooltip();
    }
  });
});
