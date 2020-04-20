<?php
// no direct access
defined('_JEXEC') or die;

use Maximenuck\CKFof;
use Maximenuck\Helper;
use Maximenuck\CKFramework;

CKFramework::load();
CKFramework::loadFaIconsInline();
Helper::loadCkbox();

// for ordering
$listOrder = $this->state->get('filter_order', 'a.id');
$listDirn = $this->state->get('filter_order_Dir', 'ASC');
$filter_search = $this->state->get('filter_search', '');
$limitstart = $this->state->get('limitstart', 0);
$limit = $this->state->get('limit', 20);
?>
<form action="<?php echo JRoute::_('index.php?option=com_maximenuck'); ?>" method="post" name="adminForm" id="adminForm">
	<?php Helper::addSidebar(); ?>
	<div class="ckadminarea">
		<div id="filter-bar" class="btn-toolbar">
			<div class="filter-search ckbutton-group">
				<label for="filter_search" class="element-invisible"><?php echo JText::_('JSEARCH_FILTER_LABEL'); ?></label>
				<input type="text" name="filter_search" id="filter_search" placeholder="<?php echo JText::_('JSEARCH_FILTER'); ?>" value="<?php echo $this->state->get('filter_search'); ?>" class="hasTooltip" title="" />
				<button type="submit" class="ckbutton hasTooltip" title="<?php echo JText::_('JSEARCH_FILTER_SUBMIT'); ?>"><i class="icon-search"></i></button>
				<button type="button" class="ckbutton hasTooltip" title="<?php echo JText::_('JSEARCH_FILTER_CLEAR'); ?>" onclick="this.form.filter_search.value = '';
						this.form.submit();"><i class="icon-remove"></i></button>
			</div>
				<div class="ckbutton-group pull-right hidden-phone">
					<label for="limit" class="element-invisible"><?php echo JText::_('JFIELD_PLG_SEARCH_SEARCHLIMIT_DESC'); ?></label>
				<?php echo $this->pagination->getLimitBox(); ?>
				</div>
		</div>
		<?php if (function_exists('get_magic_quotes_gpc') && get_magic_quotes_gpc()) { ?>
			<div class="alert alert-error">
				<h4 class="alert-heading">IMPORTANT</h4>
				<p>You must disable the 'magic_quotes_gpc' on your server else you will have some problems into the component</p>
			</div>
		<?php } ?>
	
		<table class="table table-striped" id="itemsList">
			<thead>
				<tr>
					<th class='left'>
						<?php echo JHtml::_('grid.sort', 'JGLOBAL_TITLE', 'a.title', $listDirn, $listOrder); ?>
					</th>
					<th width="1%" class="nowrap center">
						<?php echo 'style' ?>
					</th>
					<th width="1%" class="nowrap center">
						<?php echo 'source' ?>
					</th>
					<th width="1%" class="nowrap center">
						<?php echo JHtml::_('grid.sort', 'JSTATUS', 'a.published', $listDirn, $listOrder); ?>
					</th>
					<th width="15%" class="nowrap hidden-phone">
						<?php echo JHtml::_('grid.sort', 'CK_POSITION', 'position', $listDirn, $listOrder); ?>
					</th>
					<th width="1%" class="nowrap">
						<?php echo JHtml::_('grid.sort', 'JGRID_HEADING_ID', 'a.id', $listDirn, $listOrder); ?>
					</th>
				</tr>
			</thead>
			<tbody>
				<?php
				foreach ($this->items as $i => $item) :
					$link = 'index.php?option=com_modules&&task=module.edit&id=' . $item->id;
					$params = new JRegistry($item->params);
					$source = $params->get('source', '');
					?>
					<tr class="row<?php echo $i % 2; ?>">
						<td>
							<a href="<?php echo JUri::root(true) . '/administrator/' . $link ?>"><?php echo $item->title; ?></a>
							<?php echo (Helper::isV9($params->get('isv9', 0, 'int'), $item->id) == '1' ? '' : '<span class="cklabel cklabel-warning">' . JText::_('CK_V8_VERSION_ALERT') . '</span>'); ?>
						</td>
						<td width="1%" class="nowrap center">
							<?php echo $params->get('style') ?>
						</td>
						<td width="1%" class="nowrap center">
							<?php echo $source ?>
						</td>
						
						<td class="center">
							<?php
							$buttonstate = $item->published == '1' ? '' : 'un';
							?>
							<span class="icon-<?php echo $buttonstate ?>publish"></span>
						</td>
						<td class="small">
								<?php if ($item->position) : ?>
								<span class="label label-info">
								<?php echo $item->position; ?>
								</span>
								<?php else : ?>
								<span class="label">
								<?php echo JText::_('JNONE'); ?>
								</span>
								<?php endif; ?>
						</td>
						<td class="center">
						<?php echo (int) $item->id; ?>
						</td>
						
					</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
		<?php echo $this->pagination->getListFooter() ?>

		<div>
			<input type="hidden" name="task" value="" />
			<input type="hidden" name="boxchecked" value="0" />
			<input type="hidden" name="filter_order" value="<?php echo $listOrder; ?>" />
			<input type="hidden" name="filter_order_Dir" value="<?php echo $listDirn; ?>" />
			<?php CKFof::renderToken() ?>
		</div>
	</div>
</form>